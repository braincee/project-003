'use server';
import fetch from 'node-fetch';
import { formatEther } from 'viem';

export async function gas(address: string) {

  //! RETURN A DUMMY MAP WHEN YOU'RE BUILDING THE UI TO AVOID WAITING AND NOT CONSUME API CREDITS
  // return {
  //   txCount: 10,
  //   topTransaction: {},  // copy data from a response
  //   topMinerTxs: , 
  //   topMinerPaid: ,
  //   gasBurned: '0.0551',
  //   uniqueMiners: , 
  //   allMinersUnique: false,
  // };

  const key = 'cqt_rQmbHvMYPQ6r7gcyMbv36cVMmrPY';
  let url = `https://api.covalenthq.com/v1/eth-mainnet/address/${address}/transactions_v3/page/0/`;
  let headers = new Headers();
  headers.set('Authorization', `Bearer ${key}`);

  let page = 0;
  let hasMore = true;
  const transactions = [];

  while (hasMore) {
    console.log('Page:', page);

    const response = await fetch(url, { method: 'GET', headers: headers });
    const json = await response.json() as any;
    
    transactions.push(
      ...json.data.items.filter(
        (item: any) => item.from_address.toLowerCase() === address.toLowerCase()
      )
    );

    if (json.data.links.next == null) {
      hasMore = false;
    } else {
      page = page + 1;
      url = `https://api.covalenthq.com/v1/eth-mainnet/address/${address}/transactions_v3/page/${page}/`;
    }
  }

  let txCount = 0;
  let gasBurned = BigInt(0);
  let topTransaction = transactions[0];
  const miners: string[] = [];
  const minerFees: any = {};
  const minerTxs: any = {};
  const uniqueMiners: string[] = [];
  
  transactions.forEach((item) => {
    txCount = txCount + 1;
    gasBurned = gasBurned + BigInt(item.fees_paid);
    miners.push(item.miner_address);

    if (minerFees[item.miner_address] == null) {
      minerFees[item.miner_address] = BigInt(item.fees_paid);
    } else {
      minerFees[item.miner_address] =
        minerFees[item.miner_address] + BigInt(item.fees_paid);
    }

    if (minerTxs[item.miner_address] == null) {
      minerTxs[item.miner_address] = 1;
    } else {
      minerTxs[item.miner_address] = minerTxs[item.miner_address] + 1;
    }

    if (!uniqueMiners.includes(item.miner_address)) {
        uniqueMiners.push(item.miner_address);
        }

    if (topTransaction.fees_paid < item.fees_paid) {
      topTransaction = item;
    }
  });

  const topMinerPaid = Object.keys(minerFees).reduce((a, b) =>
    minerFees[a] > minerFees[b] ? a : b
  );

  const topMinerTxs = Object.keys(minerTxs).reduce((a, b) =>
    minerTxs[a] > minerTxs[b] ? a : b
  );

  const allMinersUnique = uniqueMiners.length == miners.length;

  return {
    txCount, // number of txs
    topTransaction, // transaction with highest gas cost
    topMinerTxs, // miner with most txs
    topMinerPaid, // miner with most fees received
    gasBurned: formatEther(gasBurned), // total gas paid
    uniqueMiners, // nr. of unique miner addresses
    allMinersUnique, // all miners are unique (no duplicate miner addresses, so no miner has mined more than one tx)
  };
}


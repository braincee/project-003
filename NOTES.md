
# GASTON
- This is a simple app that shows you how much gas you burned since The Merge.

# NEXT
- We are using NextJS with `App` Router now, it's finally stable enough to switch from the `Pages` Router.
- Try to get accustomed to it and its file naming conventions (`layout`, `loading`, `error`, etc). Skipping the docs will leave you with basic understanding issues and you'll have to go back to the docs. The difference that counts is how much time it took you to complete the project.
- App Router is tremendously powerful. There are more things it does automatically now, so you need to know about them in the first place to benefit of the advantages, and not shoot yourself in the foot using it.
- Submitting the input field is done through Server Actions (`https://nextjs.org/docs/app/api-reference/functions/server-actions`), very similar to tRPC. The main similarity is you don't have to write any code to handle the actual `fetch(https://....)` request, it's all done for you. You just have to write the function and `call()` it in the component.

# INTERFACE, UI, UX
- The app has one page with 3 different states. They are explained in detail below.
- Make heavy use of Framer Motion. Read how to use it properly with Suspense and figure out how to place it on MUI components.
    - Everything is animated, the field and the button fade in, they fade out when going to the post-input state, same with everything else. You can use the `AnimatePresence` component to animate things in and out. You'll be like a surgeon with this library and make sure everything feels smooth.
    - I think you can do some wizardry with MUI Joy and Framer Motion together using the `component` prop of the MUI components. Example: `<Button component={motion.button} ...`
    - See Framer examples and animation resources: `framer.com/motion/examples` & `blog.maximeheckel.com/posts/advanced-animation-patterns-with-framer-motion`
- Use Canvas Confetti after getting the result from the server. When you display the results state, fire off the confetti beforehand. It's a nice touch.
- Think of a nice layout to display the data received from the api. Most importantly, just make a layout, start changing, make copies of it and go in different directions. You'll find something nice eventually if you keep trying and don't get discouraged after 2 tries. Simple is best: `dribbble.com/shots/21558159-unt-tled-2023`
- You can style the MUI components however you like. They have the special `--Variables` that you have access to on each component (`https://mui.com/joy-ui/react-card/#css-variables-playground`). Depending on the component, you can change the border radius, the colors, the font, etc. Some `--Variables` are general and apply to all components. Don't go right into changing `sx`, only use it after you've seen what the `--Variables` can do for you.

## INITIAL STATE
- Has a big field in the middle of the screen where the user can enter their wallet address.
- No buttons, just a really hightech field that looks like it's from the future.
- Make the borders glow when you move the mouse near them.
- You press enter to submit the address.

## LOADING STATE
- This is natively part of NextJS now, so do a quick reading on how you show a loading state with the built-in Loading/Suspense support.
    - `https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming`
    - `https://nextjs.org/docs/app/api-reference/file-conventions/loading`
- While we wait for the request to finish, the input and button dissapear and a big loading bar appears.
- Beneath the loading bar is a text (sentence) that changes every 2 seconds. You can use the `useInterval` hook from `usehooks-ts` to do this, it has a lot of useful hooks that you are free to use when needed!
- You store different sentences in a static (hardcoded) array and pick a different every time. The messages should be funny and random, like the Discord loading messages when you open the app. Go on that rizzzzzzz 🤪
- As always, don't forget the animations. Each sentence should fade out then be replaced by the other sentence that fades in.
- As always x2, the only correct way to do this is in the docs and examples. Otherwise you're gonna spend more time than you have.

## RESULTS STATE
- The info we need to show to the user:
    - `txCount` (how many transactions they have)
    - `gasUsed` (how much gas they burned in total) 
    - `topMinerTxs` (miner address who mined the most transactions for this user) (show only if `allMinersUnique` is true)
    - `topMinerPaid` (miner address who got paid the most by this user)
    - If `allMinersUnique` is false, show only one (big) box for the `topMinerPaid`.
    - If `allMinersUnique` is true, show 2 medium sized boxes, one for each stat.
    - `topTransaction` (transaction that burned the most gas)
- The way to disply this info in a nice way that makes people go "wow" (just for some data, yes), is to just play around with it (try stuff). Each stat should be in its own card, but as you've read above, each card has a different purpose. This means it might have a different size, some may have icons, some not, some may have a title, some not, etc. Just play around with it and you'll find something that looks like it wasn't "made" by hand, instead it was like this from the start, meant to be.
- `https://ultrasound.money` is a website that shows how the supply of ETH has changed after Proof of Stake was established. It's a very simple website, but it looks very nice. Pay attention to little details like showing the ETH symbol/icon, etc. It's just a bunch of cards with some text and a graph (the intro header is a static video, not html). But it looks very nice. You can do the same with this website, just think outside of the box and see yourself as an expert UI designer that has been doing this for 5 years.
- I am not joking, it's easy. You're making it hard and losing hope prematurely instead of proving you can do that too (and it doesn't feel like effort to you).


# TYPESCRIPT
- The code needs types. Types for `CovalentResponse`, the `minerFees`, `minerTxs`, etc.
- You will need to write the type definitions yourself, it's not hard. Just look at the data you are getting from the `fetch` request to ovalent and create a type for it.
- You can also use `https://app.quicktype.io` to generate types from JSON data.
- For the `CovalentResponse` type, you case the `.json()` call `as CovalentReponse` instead of `as any`.
- Replace all `any` types with actual types created by you. Create types for our response object as well, the `return` value of the `gas` fn.
- Install this VS Code extension: `https://marketplace.visualstudio.com/items?itemName=mattpocock.ts-error-translator`. Mark the hints as learned as you see them.

------------------------------------------
After you read all this, you realize we're talking about literally a single page app that makes a request and shows the result in some cards. Don't overthink it. The API is already written. 

"A user interface is like a joke: if you have to explain it, it's not that good" - Martin Leblanc
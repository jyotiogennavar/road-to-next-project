The goal is to allow only authorized users to be able to access the tickets page

when we look at out routes, the authorized user can access the tickets page but all other pages can be accessed by other users


- First, we create a layout.tsx file in the tickets folder to write the authentication code to access all tickets pages

- to be able to reuse the logic of redirecting users to the sign IN page if not authenticated, we create a get-auth-or-redirect.ts page and add our logic in it. 
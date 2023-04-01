# LensHack Notes

```bash
# LensHack was initialized using the CLI (sveltekit, tailwind, skeleton)

npm create skeleton-app@latest my-skeleton-app
```

```bash
# Next threlte was added to the project following the documentation from

https://next.threlte.xyz/docs/learn/getting-started/installation

# and using the command

npm install three @threlte/core@next @threlte/extras@next @threlte/rapier@next @dimforge/rapier3d-compat @theatre/core @theatre/studio @types/three
```

One cavaet: the orbital controls and intraactivity initially failed due to not having the file

> `node_modules/three/examples/jsm/objects/GroundProjectedEnv.js`

This file was copied from an old project into this project. Now the app works. This is a little concerning.

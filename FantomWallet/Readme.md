# Fantom Wallet App

Package Installation
```sh
yarn
yarn jetify
```
Application launch
```sh
yarn ios          # runs ios
yarn android      # runs android
```


# Coding convention
- Folder name and file name should be camel case.
- Common components should be in `src/components` directory.
- For each common component start with 2 files i.e `index.js` and `styles.js`. All styling should be done in `styles.js` file.
- If there is no need of state in an component then make that component as pure component or function.
- File size should be less than 120 lines.

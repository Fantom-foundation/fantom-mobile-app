# Fantom Wallet

## Introduction

This is the repository for the Fantom Wallet mobile application.

## Technology Stack
* React v16.4.1
* React-Native v0.56.0
* Redux v4.0.0
* react-navigation v2.11.2

## Installation

 You will need Node.js, Watchman, the React Native command line interface, and Xcode.

 Node, Watchman
  We recommend installing Node and Watchman using [Homebrew](http://brew.sh/). Run the following commands in a Terminal after installing Homebrew:

```
brew install node@10
brew install watchman
```

The React Native CLI
Node.js comes with npm, which lets you install the React Native command line interface.

```
npm i react-native
```

Alternatively, you can use `yarn`:

```
yarn global add react-native-cli
```

## Setup

* git clone https://github.com/Fantom-foundation/fantom-mobile-app.git
* cd FantomWallet

```
npm install --legacy-peer-deps
npm run jetify
```

Alternatively, use `yarn`: (DEPRECATED)

```
yarn install
yarn run jetify
```

## iOS SETUP

## Xcode
The easiest way to install Xcode is via the [Mac App Store](https://itunes.apple.com/us/app/xcode/id497799835?mt=12). Installing Xcode will also install the iOS Simulator and all the necessary tools to build your iOS app.

run on iOS using command
```
react-native run-ios
```
or you can run directly from xcode.


## ANDROID SETUP

1. Download and install Android Studio

[Android Studio](https://developer.android.com/studio/install.html) provides the Android SDK and AVD (emulator) required to run and test your React Native apps.


* Android Studio requires the [Java SE Development Kit(JDK)](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html), version 8. You can type javac -version in a terminal to see what version you have, if any.

```
$ javac -version
javac 1.8.0_111
```

* The version string 1.8.x_xxx corresponds to JDK 8.

2. Install the AVD and HAXM

Choose Custom installation when running Android Studio for the first time. Make sure the boxes next to all of the following are checked:

```
> Android SDK
> Android SDK Platform
> Performance (Intel ® HAXM)
> Android Virtual Device
> Then, click "Next" to install all of these components.
```
* If you've already installed Android Studio before, you can still [install HAXM](https://software.intel.com/en-us/android/articles/installation-instructions-for-intel-hardware-accelerated-execution-manager-windows) without performing a custom installation.

3. Install the Android 6.0 (Marshmallow) SDK

Android Studio installs the most recent Android SDK by default. React Native, however, requires the Android 6.0 (Marshmallow) SDK. To install it, launch the SDK Manager, click on "Configure" in the "Welcome to Android Studio" screen.

For more detail visit: `https://facebook.github.io/react-native/docs/getting-started`

4. run using command
```
react-native run-android
```

## Running on Device
To run the app on device, please follow instructions [here](https://facebook.github.io/react-native/docs/0.59/running-on-device)

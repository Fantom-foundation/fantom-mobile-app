package com.fantomwallet;

import android.app.Application;

import com.facebook.react.ReactApplication;
import fr.greweb.reactnativeviewshot.RNViewShotPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.bitgo.randombytes.RandomBytesPackage;
import io.xogus.reactnative.versioncheck.RNVersionCheckPackage;
import com.horcrux.svg.SvgPackage;
import cl.json.RNSharePackage;
import org.reactnative.camera.RNCameraPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import cl.json.ShareApplication;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ShareApplication, ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNViewShotPackage(),
            new AsyncStoragePackage(),
            new AsyncStoragePackage(),
            new RandomBytesPackage(),
            new RNVersionCheckPackage(),
            new SvgPackage(),
            new RNSharePackage(),
            new RNCameraPackage(),
            new VectorIconsPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
   @Override
     public String getFileProviderAuthority() {
            return "com.fantomwallet.provider";
     }
}

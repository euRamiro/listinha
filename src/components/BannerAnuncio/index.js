import React from 'react';
import {View} from 'react-native';
import NativeAdView, {
  CallToActionView,
  IconView,
  HeadlineView,
  TaglineView,
  AdvertiserView,
  MediaView,
  StarRatingView,
} from 'react-native-admob-native-ads';
import {AdManager} from 'react-native-admob-native-ads';

const BannerAnuncio = () => {
  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        justifyContent: 'center',
      }}>
      <NativeAdView
        style={{
          width: '95%',
          alignSelf: 'center',
        }}
        delayAdLoading={10000}
        adUnitID={'ca-app-pub-8374324571031415/1519150634'} // REPLACE WITH NATIVE_AD_VIDEO_ID for video ads.
      >
        <View
          style={{
            width: '100%',
          }}>
          <View
            style={{
              height: 100,
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              paddingHorizontal: 10,
            }}>
            <IconView
              style={{
                width: 60,
                height: 60,
              }}
            />
            <View
              style={{
                width: '60%',
                maxWidth: '60%',
                paddingHorizontal: 6,
              }}>
              <HeadlineView
                style={{
                  fontWeight: 'bold',
                  fontSize: 13,
                }}
              />
              <TaglineView
                numberOfLines={1}
                style={{
                  fontSize: 11,
                }}
              />
              <AdvertiserView
                style={{
                  fontSize: 10,
                  color: 'gray',
                }}
              />

              <StarRatingView />
            </View>

            <CallToActionView
              style={{
                height: 45,
                paddingHorizontal: 12,
                backgroundColor: 'purple',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
                elevation: 10,
              }}
              textStyle={{color: 'white', fontSize: 14}}
            />
          </View>
          <MediaView
            style={{
              width: '100%',
              height: 400 / aspectRatio,
              backgroundColor: 'white',
            }}
          />
        </View>
      </NativeAdView>
    </View>
  );
};

export default BannerAnuncio;

// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

import type { AllowList } from "./types.ts";

export type PolicyControlledFeatures =
  | StandardizedFeatures
  | ProposedFeatures
  | ExperimentalFeatures;

export interface StandardizedFeatures {
  /** The Accelerometer interface of the Sensor APIs provides on each reading the acceleration applied to the device along all three axes.
   *
   * @see [Generic Sensor API](https://www.w3.org/TR/generic-sensor/#feature-policy)
   */
  readonly accelerometer?: AllowList | readonly AllowList[];

  /** The AmbientLightSensor interface of the Sensor APIs returns the current light level or illuminance of the ambient light around the hosting device.
   *
   * @see [Generic Sensor API](https://www.w3.org/TR/generic-sensor/#feature-policy)
   */
  readonly ambientLightSensor?: AllowList | readonly AllowList[];

  /** Controls the ability to have Media (Audio or Video) elements begin playback without user interaction in the current document.
   * When this policy is disabled and there were no user gestures, the Promise returned by `HTMLMediaElement.play()` will reject with a `DOMException`. The autoplay attribute on <audio> and <video> elements will be ignored.
   * @see [HTML Living Standard](https://html.spec.whatwg.org/multipage/infrastructure.html#policy-controlled-features)
   */
  readonly autoplay?: AllowList | readonly AllowList[];

  /** The Battery Status API can be used to defer or scale back work when the device is not charging in or is low on battery.
   * @see [Battery Status API](https://w3c.github.io/battery/#permissions-policy-integration)
   */
  readonly battery?: AllowList | readonly AllowList[];

  /** Controls whether the methods exposed by the bluetooth attribute on the `Navigator` object may be used.
   * @see [Web Bluetooth](https://webbluetoothcg.github.io/web-bluetooth/#permissions-policy)
   */
  readonly bluetooth?: AllowList | readonly AllowList[];

  /** Manages access to Camera interfaces (physical and virtual).
   * @see [Media Capture](https://w3c.github.io/mediacapture-main/#permissions-policy-integration)
   */
  readonly camera?: AllowList | readonly AllowList[];

  /** Information about a [user agent's](https://infra.spec.whatwg.org/#user-agent) [branding](https://wicg.github.io/ua-client-hints/#user-agent-brand) and significant version.
   * @see [User-Agent Client Hints](https://wicg.github.io/ua-client-hints/)
   */
  readonly chUa?: AllowList | readonly AllowList[];

  /** Information about the architecture of the platform on which a given [user agent](https://infra.spec.whatwg.org/#user-agent) is executing.
   * @see [User-Agent Client Hints](https://wicg.github.io/ua-client-hints/)
   */
  readonly chUaArch?: AllowList | readonly AllowList[];

  /** Information about the [platform bitness](https://wicg.github.io/ua-client-hints/#user-agent-platform-bitness) of the architecture of the platform on which a given [user agent](https://infra.spec.whatwg.org/#user-agent) is executing.
   * @see [User-Agent Client Hints](https://wicg.github.io/ua-client-hints/)
   */
  readonly chUaBitness?: AllowList | readonly AllowList[];

  /** Information about the user agent’s [full version](https://wicg.github.io/ua-client-hints/#user-agent-full-version).
   * @see [User-Agent Client Hints](https://wicg.github.io/ua-client-hints/)
   */
  readonly chUaFullVersion?: AllowList | readonly AllowList[];

  /** Information about the [full version](https://wicg.github.io/ua-client-hints/#user-agent-full-version) for each brand in its [brands](https://wicg.github.io/ua-client-hints/#user-agent-brands) list.
   * @see [User-Agent Client Hints](https://wicg.github.io/ua-client-hints/)
   */
  readonly chUaFullVersionList?: AllowList | readonly AllowList[];

  /** Information about whether or not a [user agent](https://infra.spec.whatwg.org/#user-agent) prefers a "mobile" user experience.
   * @see [User-Agent Client Hints](https://wicg.github.io/ua-client-hints/)
   */
  readonly chUaMobile?: AllowList | readonly AllowList[];

  /** Information about the device on which a given [user agent](https://infra.spec.whatwg.org/#user-agent) is executing.
   * @see [User-Agent Client Hints](https://wicg.github.io/ua-client-hints/)
   */
  readonly chUaModel?: AllowList | readonly AllowList[];

  /** Information about the platform on which a given [user agent](https://infra.spec.whatwg.org/#user-agent) is executing.
   * @see [User-Agent Client Hints](https://wicg.github.io/ua-client-hints/)
   */
  readonly chUaPlatform?: AllowList | readonly AllowList[];

  /** Information about the [platform version](https://wicg.github.io/ua-client-hints/#user-agent-platform-version) on which a given user agent is executing.
   * @see [User-Agent Client Hints](https://wicg.github.io/ua-client-hints/)
   */
  readonly chUaPlatformVersion?: AllowList | readonly AllowList[];

  /** Information about whether or not a [user agent](https://infra.spec.whatwg.org/#user-agent) binary is running in 32-bit mode on 64-bit Windows.
   * @see [User-Agent Client Hints](https://wicg.github.io/ua-client-hints/)
   */
  readonly chUaWow64?: AllowList | readonly AllowList[];

  /** Cross-origin isolation enables a web page to use powerful features such as `SharedArrayBuffer`, `performance.measureUserAgentSpecificMemory()`,
   * high resolution timer with better precision, or the JS Self-Profiling API.
   *
   * @see [HTML Living Standard](https://html.spec.whatwg.org/multipage/infrastructure.html#policy-controlled-features)
   */
  readonly crossOriginIsolated?: AllowList | readonly AllowList[];

  /** A document's permissions policy determines whether any content in that document is allowed to use `getDisplayMedia`.
   *
   * @see [Media Capture: Screen Share](https://w3c.github.io/mediacapture-screen-share/#permissions-policy-integration)
   */
  readonly displayCapture?: AllowList | readonly AllowList[];

  /** Encrypted Media Extensions provides an API that enables web applications to interact with content protection systems, to allow playback of encrypted audio and video.
   * Provides access to the `requestMediaKeySystemAccess()` method, a part of the `MediaKeys` object.
   *
   * @see [Encrypted Media Extensions](https://w3c.github.io/encrypted-media/#permissions-policy-integration)
   */
  readonly encryptedMedia?: AllowList | readonly AllowList[];

  /** Controls if tasks should execute for nested browsing contexts (eg. iframes) when it has/is not being rendered.
   * @see [Page Lifecycle](https://wicg.github.io/page-lifecycle/#feature-policies)
   */
  readonly executionWhileNotRendered?: AllowList | readonly AllowList[];

  /** Controls if tasks should execute for nested browsing contexts (eg. iframes) when not within the current viewport.
   * @see [Page Lifecycle](https://wicg.github.io/page-lifecycle/#feature-policies)
   */
  readonly executionWhileOutOfViewport?: AllowList | readonly AllowList[];

  /** Determines whether any content in a document is allowed to go fullscreen.
   * If disabled in any document, no content in the document will be allowed to use fullscreen.
   * @see [Fullscreen API](https://fullscreen.spec.whatwg.org/#permissions-policy-integration)
   */
  readonly fullscreen?: AllowList | readonly AllowList[];

  /** The Geolocation API provides access to geographical location information associated with the host device.
   *
   * @see [Geolocation API](https://w3c.github.io/geolocation-api/#permissions-policy)
   */
  readonly geolocation?: AllowList | readonly AllowList[];

  /** Gyroscope sensor interface to monitor the rate of rotation around the three local primary axes of the device.
   *
   * @see [Generic Sensor API](https://www.w3.org/TR/generic-sensor/#feature-policy)
   */
  readonly gyroscope?: AllowList | readonly AllowList[];

  /** Allow a web page to communicate with HID devices (Human Interface Device).
   *
   * @see [WebHID API](https://wicg.github.io/webhid/#permissions-policy)
   */
  readonly hid?: AllowList | readonly AllowList[];

  /** Allow usage of the IdleDetector interface to better detect if a user is at their device,
   * instead of trying to identify if a user has just become inactive, such as left window open, screen saver activated, screen turned off, changed tabs or changed applications.
   *
   * @see [Idle Detection API](https://wicg.github.io/idle-detection/#api-permissions-policy)
   */
  readonly idleDetection?: AllowList | readonly AllowList[];

  /** Controls whether the `getLayoutMap()` method is exposed on the "Keyboard" interface.
   *
   * @see [Keyboard API](https://wicg.github.io/keyboard-map/#permissions-policy)
   */
  readonly keyboardMap?: AllowList | readonly AllowList[];

  /** Magnetometer sensor interface to measure a magnetic field in the X, Y and Z axis.
   *
   * @see [Generic Sensor API](https://www.w3.org/TR/generic-sensor/#feature-policy)
   */
  readonly magnetometer?: AllowList | readonly AllowList[];

  /** Manages access to `Microphone` interfaces (physical and virtual).
   *
   * @see [Media Capture](https://w3c.github.io/mediacapture-main/#permissions-policy-integration)
   */
  readonly microphone?: AllowList | readonly AllowList[];

  /** Musical Instrument Digital Interface (MIDI) protocol enables electronic musical instruments, controllers and computers to communicate and synchronize with each other.
   *
   * @see [Web MIDI](https://webaudio.github.io/web-midi-api/#permissions-policy-integration)
   */
  readonly midi?: AllowList | readonly AllowList[];

  /** Enables the page author to take control over the behavior of spatial navigation, or to cancel it outright.
   * Spatial navigation is the ability to move around the page directionally which can be useful for a web page built using a grid-like layout, or other predominantly non linear layouts.
   * More often this is used in browsers on devices with limited input control, such as a TV.
   *
   * @see [CSS Spatial Navigation](https://drafts.csswg.org/css-nav-1/#policy-feature)
   */
  readonly navigationOverride?: AllowList | readonly AllowList[];

  /** Allow merchants (i.e. web sites selling physical or digital goods) to utilise one or more payment methods with minimal integration.
   *
   * @see [Payment Request API](https://www.w3.org/TR/payment-request/#permissions-policy)
   */
  readonly payment?: AllowList | readonly AllowList[];

  /** Allow websites to create a floating video window always on top of other windows so that users may continue consuming media while they interact with other content sites, or applications on their device.
   * This item controls whether the request Picture-in-Picture algorithm may return a `SecurityError` and whether `pictureInPictureEnabled` is true or false.
   *
   * @see [Picture-in-Picture](https://w3c.github.io/picture-in-picture/#feature-policy)
   */
  readonly pictureInPicture?: AllowList | readonly AllowList[];

  /** Determines whether any content in the allowed documents is allowed to successfully invoke the Web Authentication API.
   * If disabled in any document, no content in the document will be allowed to use the foregoing methods, attempting to do so will return an error.
   *
   * @see [Web Authentication API](https://w3c.github.io/webauthn/#sctn-permissions-policy)
   */
  readonly publickeyCredentialsGet?: AllowList | readonly AllowList[];

  /** A screen wake lock prevents the screen from turning off.
   * Only visible documents can acquire the screen wake lock.
   *
   * @see [Wake Lock API](https://w3c.github.io/screen-wake-lock/#policy-control)
   */
  readonly screenWakeLock?: AllowList | readonly AllowList[];

  /** Provide direct communication between a web site and the device that it is controlling via a `Serial` port.
   *
   * @see [Web Serial API](https://wicg.github.io/serial/#permissions-policy)
   */
  readonly serial?: AllowList | readonly AllowList[];

  /** The sync-xhr policy controls whether synchronous requests can be made through the XMLHttpRequest API. If disallowed in a document, then calls to `send()` on `XMLHttpRequest` objects with the synchronous flag set will fail, causing a `NetworkError` `DOMException` to be thrown.
   *
   * @see [XMLHttpRequest Living Standard](https://xhr.spec.whatwg.org/#feature-policy-integration)
   */
  readonly syncXhr?: AllowList | readonly AllowList[];

  /** The WebUSB API provides a way to safely expose USB device services to the web.
   * Controls whether the usb attribute is exposed on the `Navigator` object.
   * @see [WebUSB](https://wicg.github.io/webusb/#permissions-policy)
   */
  readonly usb?: AllowList | readonly AllowList[];

  /** Exposes the `navigator.share()` API where supported, which shares the current URL via user agent provided share to locations.
   *
   * @see [Web Share API](https://w3c.github.io/web-share/#permissions-policy)
   */
  readonly webShare?: AllowList | readonly AllowList[];

  /** The WebXR Device API provides the interfaces necessary to enable developers to build compelling, comfortable, and safe immersive applications on the web across a wide variety of hardware form factors.
   *
   * @see [WebXR Device API](https://immersive-web.github.io/webxr/#permissions-policy)
   */
  readonly xrSpatialTracking?: AllowList | readonly AllowList[];
}

export interface ProposedFeatures {
  /** Read from the device clipboard via the Clipboard API
   *
   * @see [Clipboard API and events](https://w3c.github.io/clipboard-apis/#read-permission)
   */
  readonly clipboardRead?: AllowList | readonly AllowList[];

  /** Write to the device clipboard via the Clipboard API
   *
   * @see [Clipboard API and events](https://w3c.github.io/clipboard-apis/#write-permission)
   */
  readonly clipboardWrite?: AllowList | readonly AllowList[];

  /** Determines whether any content in that document is allowed to access `getGamepads()`.
   * If disabled in any document, no content in the document will be allowed to use `getGamepads()`, nor will the `"gamepadconnected"` and `"gamepaddisconnected"` events fire.
   *
   * @see [Gamepad](https://w3c.github.io/gamepad/#permission-policy)
   */
  readonly gamepad?: AllowList | readonly AllowList[];

  /** Safe autofilling of cross-origin forms.
   * @see [shared-autofill](https://github.com/schwering/shared-autofill)
   */
  readonly sharedAutofill?: AllowList | readonly AllowList[];

  /** Determines whether any content in a document is allowed to use the `selectAudioOutput` function to prompt the user to select an audio output device,
   * or allowed to use `setSinkId` to change the device through which audio output should be rendered, to a non-system-default user-permitted device.
   *
   * @see [Audio Output Devices API](https://w3c.github.io/mediacapture-output/)
   */
  readonly speakerSelection?: AllowList | readonly AllowList[];
}

export interface ExperimentalFeatures {
  /** Permission for Topics API.
   * @see [Topics API](https://patcg-individual-drafts.github.io/topics/)
   */
  readonly browsingTopics?: AllowList | readonly AllowList[];

  /** Click Through Attribution Reporting.
   *
   * @see [Attribution Reporting](https://wicg.github.io/attribution-reporting-api/#permission-policy-integration)
   */
  readonly conversionMeasurement?: AllowList | readonly AllowList[];

  /** Helps control the use of automated focus in a main frame or `<iframe>`.
   * The proposed feature provides a means for developers to block the use of automatic focus in nested contents.
   *
   * @see [focus-without-user-activation Policy](https://github.com/w3c/webappsec-permissions-policy/blob/main/policies/focus-without-user-activation.md)
   */
  readonly focusWithoutUserActivation?: AllowList | readonly AllowList[];

  /** FLEDGE API of `navigator.joinAdInterestGroup()` permission.
   * @see [FLEDGE](https://wicg.github.io/turtledove/#permissions-policy-integration)
   */
  readonly joinAdInterestGroup?: AllowList | readonly AllowList[];

  /** Local Font Access API permission.
   * @see [Local Font Access API](https://wicg.github.io/local-font-access/#permissions-policy)
   */
  readonly localFonts?: AllowList | readonly AllowList[];

  /** FLEDGE API of `navigator.runAdAuction()` permission.
   * @see [FLEDGE](https://wicg.github.io/turtledove/#permissions-policy-integration)
   */
  readonly runAdAuction?: AllowList | readonly AllowList[];

  readonly syncScript?: AllowList | readonly AllowList[];

  /** This API proposes a new per-origin storage area for “Privacy Pass” style cryptographic tokens, which are accessible in third party contexts.
   * These tokens are non-personalized and cannot be used to track users, but are cryptographically signed so they cannot be forged.
   *
   * @see [Private State Token API](https://wicg.github.io/trust-token-api/)
   */
  readonly trustTokenRedemption?: AllowList | readonly AllowList[];

  /** Disable or restrict browser unload events.
   * The proposal, via existing `Permissions-Policy` header features, supports the ability to only enable Unload Events for some domains.
   *
   * @see [Permissions-Policy to disable unload handler](https://github.com/fergald/docs/blob/master/explainers/permissions-policy-unload.md)
   */
  readonly unload?: AllowList | readonly AllowList[];

  /** Vertical scroll policy is a feature introduced to assist websites in blocking certain embedded contents from interfering with vertical scrolling.
   * Stopping a user from vertically scrolling the page might be a frustrating experience.
   * @see [Vertical Scroll Policy](https://github.com/w3c/webappsec-permissions-policy/blob/main/policies/vertical_scroll.md)
   */
  readonly verticalScroll?: AllowList | readonly AllowList[];

  /** Provide additional information for Multi-Screen Window Placement.
   * @see [Window Management on the Web](https://github.com/w3c/window-management/blob/main/EXPLAINER.md)
   */
  readonly windowPlacement?: AllowList | readonly AllowList[];
}

import { defineExtensionMessaging } from '@webext-core/messaging';
// import { defineWindowMessaging } from '@webext-core/messaging/page';

export const { sendMessage, onMessage } = defineExtensionMessaging();
// export const { sendMessage: sendPageMessage, onMessage: onPageMessage } = defineWindowMessaging({
//   namespace: browser.runtime.id
// });

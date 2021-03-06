const ProtocolAction = require('./_base-action.js');

/**
 * Send a sequence of key strokes to the active element. The sequence is defined in the same format as the `sendKeys` command.
 * An object map with available keys and their respective UTF-8 characters, as defined on [W3C WebDriver draft spec](https://www.w3.org/TR/webdriver/#character-types), is loaded onto the main Nightwatch instance as `client.Keys`.
 *
 * Rather than the `setValue`, the modifiers are not released at the end of the call. The state of the modifier keys is kept between calls, so mouse interactions can be performed while modifier keys are depressed.
 *
 * @example
 * module.exports = {
 *  'demo Test': function(browser) {
 *    browser
 *      .setValue('input[type=search]', 'nightwatch')
 *      .keys(browser.Keys.ENTER)
 *   }
 * }
 *
 * @param {Array|string} keysToSend The keys sequence to be sent.
 * @param {function} [callback] Optional callback function to be called when the command finishes.
 * @api protocol.useractions
 */
module.exports = class Session extends ProtocolAction {
  command(keysToSend, callback) {
    if (!Array.isArray(keysToSend)) {
      keysToSend = [keysToSend];
    }

    return this.transportActions.sendKeys(keysToSend, callback);
  }
};

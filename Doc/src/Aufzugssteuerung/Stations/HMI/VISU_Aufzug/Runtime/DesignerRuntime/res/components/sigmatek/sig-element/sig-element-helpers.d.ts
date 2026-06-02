/**
 * Helper function to determine whether a property of the window object is initialized.
 * This method id deprecated, use loadjs library instead. 
 * In some cases waitForPropertyReady() can also be used.
 * @deprecated
 * @param {string} name The name of property that should be initialized.
 * @param {number} [retries=100] Number of retries to check for the property.
 * @returns {Promise<string>} Returns a resolved Promise when the property was initialized. 
 * The promise is rejected when the property was not initialized even after maximum number of retries.
 */
export const onPropertyReady: (name: string, retries?: number) => Promise<string>

/**
 * Helper function to determine whether a property of the window object is initialized.
 * @param {string} name The name of property that should be initialized.
 * @param {number} [timeout=6000] The maximum time in milliseconds to wait for the property to get initialized.
 * @param {number} [interval=50] The delay in milliseconds to wait between each check.
 * @returns {Promise<string>} Returns a resolved Promise when the property was initialized. 
 * The promise is rejected when the property was not initialized even after maximum timeout.
 */
export const waitForPropertyReady: (name: string, timeout?: number, interval?: number) => Promise<string>

/**
 * Adds the <script> tag to the end of the head of index.html.
 * @param {string} src The src attribute (url) of the script.
 * @param {string} id The id attribute of the script tag.
 * @param {string} [type='text/javascript'] The type attribute of the script.
 * @param {Boolean} [async=true] The async attribute of the script tag. Default true.
 * @param {string} [crossorigin='use-credentials'] The crossorigin attribute of the script tag.
 */
export const addScriptToHead: (src: string, id: string, type?: string, async?: boolean, crossorigin?: string) => void

/**
 * Adds the <link> tag to the end of the head of index.html.
 * @param {string} href The href attribute (url) of the link.
 * @param {string} id The id attribute of the link tag.
 * @param {string} [rel='stylesheet'] The rel attribute of the link.
 * @param {string} [crossorigin='use-credentials'] The crossorigin attribute of the link tag.
 */
export const addLinkToHead: (href: string, id: string, rel?: string, crossorigin?: string) => void


# ChatGPT-based BDD Tests Generator Extension

---

Generate BDD tests examples with OpenAI's GPT-3.5 model.

## Usage

1) **Install the Extension**

    - Click "Add to Chrome".

2) **Enable Analysis**

    - Click on the extension icon in your browser toolbar.

3) **Provide OpenAI API Key**

    - To enable analysis, you need to provide your OpenAI API key ([OpenAI API Key](https://openai.com/blog/openai-api)) since API is paid. By default, the extension uses the 'gpt-3.5-turbo' model ([OpenAI Pricing](https://openai.com/pricing)). We use your Chrome storage as a secure keystore.

4) **Generate Capybara Examples**

    - After providing the API key, the extension will analyze the DOM events. We are currently following up mouse down events.
    - Click on the extension icon again to generate a file with Capybara examples.

5) **Generate Custom Matchers**

    - Right-click on any element on a webpage.
    - From the context menu, select "BDD Generate Test Expect Example".

The extension will copy custom Capybara matchers based on the selected element to the clipboard.

type Selector = string | undefined | null

export const expectToHaveText = (text: Selector) => text ? (`expect(page).to have_text("${text}")`) : ''

export const expectToHaveLink = (text: Selector) => text ? (`expect(page).to have_link("${text}")`) : ''

export const expectToHaveButton = (text: Selector) => text ? (`expect(page).to have_button("${text}")`) : ''

export const expectToHaveSelector = (selector: Selector) => selector ? (`expect(page).to have_selector("${selector}")`) : ''

export const expectToHaveSelectorWithText = ({ selector, text }: { selector: Selector, text: Selector }) => selector && text ? (`expect(page).to have_selector("${selector}", text: "${text}", count: 1)`) : ''

export const expectToHavePage = (url: Selector) => url ? (`expect(page).to have_current_path("${url}")`) : ''

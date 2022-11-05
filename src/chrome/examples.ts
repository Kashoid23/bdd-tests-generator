type Selector = string | undefined | null

export const visit = (url: Selector) => url ? (`
visit "${url}"
`) : ''

export const clickLink = (selector: Selector) => selector ? (`
click_link("${selector}")
`) : ''

export const clickButton = (selector: Selector) => selector ? (`
click_button("${selector}")
`) : ''

export const check = (selector: Selector) => selector ? (`
check("${selector}")
`) : ''

export const uncheck = (selector: Selector) => selector ? (`
uncheck("${selector}")
`) : ''

export const choose = (selector: Selector) => selector ? (`
choose("${selector}")
`) : ''

export const findClick = (selector: Selector) => selector ? (`
find("${selector}").click
`) : ''

export const findTextClick = ({ selector, text }: { selector: Selector, text: Selector }) => selector && text ? (`
find("${selector}", text: "${text}").click
`) : ''

export const fillInWith = ({ selector, value }: { selector: Selector, value: Selector }) => selector && value ? (`
fill_in("${selector}", with: "${value}").click
`) : ''

export const selectFrom = ({ option, selector }: { option: Selector, selector: Selector }) => option && selector ? (`
select("${option}", from: "${selector}")
`) : ''

export const within = ({ selector, child }: { selector: Selector, child: Selector }) => selector && child ? (`
within "div${selector}" do
  ${child}
end
`) : ''

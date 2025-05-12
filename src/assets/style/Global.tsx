import { createGlobalStyle } from "styled-components";

const neoR = "/font/apple/AppleSDGothicNeoR.ttf";
const neoSB = "/font/apple/AppleSDGothicNeoSB.ttf";

const Global = createGlobalStyle`

@font-face {
  font-family: "neoSB";
  src: local("neoSB"), url(${neoSB}) format("opentype");
  font-display: fallback;
}

@font-face {
  font-family: "neoR";
  src: local("neoR"), url(${neoR}) format("opentype");
  font-display: fallback;
}

:root {
  /* font-style */
  --f-neoR: "neoR";
  --f-neoSB: "neoSB";

  --f-header: "neoSB";
  --f-title: "neoSB";
  --f-subTitle: "neoSB";
  --f-subB: "neoSB";

  
  --f-sub: "neoR";
  --f-text: "neoR";
  --f-subText: "neoR";
  --f-caption: "neoR";

  /* font-size */
  --s-text: 16px;
  --s-title: 16px;
  --s-header: 22px;

  --s-small : 12px;
  --s-sub: 14px;
  --s-caption: 13px;

  --s-subTitle: 14px;
  --s-subText: 14px;

  /* font-height */

  --l-header: 36px;
  --l-title: 24px;
  --l-subTitle: 22px;
  --l-text: 24px;
  --l-subText: 22px;
  --l-caption: 18px;
  --l-small: 18px;

  /* font-color / back-color */
  --c-black :#000;
  --c-white :#fff;
  --c-red: #e71616;
  --c-warning: rgba(231, 22, 22, 0.5);
  --c-blue : #2e81ff;

  --c-line : #E0E0E0;
  --c-input : #eee;
  --c-gray888: #888;
  --c-gray300: #666;

  --c-bg : #333;
  --c-bg2 : #222;

  --c-subText1 : rgba(0,0,0,0.5);
  --c-subText2 : rgba(255,255,255,0.5);
  --c-subText3 : #444;
  --c-mainBack : #F5F5F5;

  --shadow: 0 0 7px 0 rgba(0, 0, 0, 0.30);
  --shadow2: 0 0 10px 0 rgba(0, 0, 0, 0.25);

  --dim : rgba(0,0,0,0.5);

}

* {
  color: var(--c-black);
  font-size: var(--s-sub);
  line-height: 22px;
  font-family:"neoSB","neoR", "sans-serif";
}



svg {
  cursor: pointer;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

:disabled {
  cursor: default;
}


.scroll-lock {
  height: 100%;
  overflow-y: hidden !important;
  touch-action: none !important;
  overscroll-behavior: none;
  -webkit-overflow-scrolling: none;
}

html {
  -webkit-text-size-adjust: none;
  text-size-adjust: none;
  -ms-content-zooming: none;
  touch-action: pan-x pan-y;
  -ms-touch-action: pan-x pan-y;
}

html {
  overscroll-behavior: contain;
}

body::-webkit-scrollbar {
  width: 3px;
}

body::-webkit-scrollbar-track {
    background-color: gray;
}


body::-webkit-scrollbar-thumb {
  scroll-behavior: none;
  border : none;
  width: 2px;
  height: 10px;
  border-radius: 100px;
}

body::-webkit-scrollbar-button {
  display: none;
}

body {
  -ms-overflow-style: none;
  width: 100%;
  margin: 0 auto;
  overflow-x: hidden;
  padding-bottom: calc(env(safe-area-inset-bottom) + 56px);

}

input[type="password"]::-webkit-password-view-button,
input[type="password"]::-ms-reveal {
  background-color: transparent;
  background-size: cover;
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.swiper{
  overflow: unset;
}

.swiper-pagination.swiper-pagination-clickable.swiper-pagination-bullets.swiper-pagination-horizontal {
  position: absolute;
  bottom: -28px;
  z-index: 999;
}

a {
  color: inherit;
  text-decoration: none;
}

li {
  list-style: none;
}

html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
time,
figure,
article,
nav,
header,
footer,
hgroup,
video,
audio,
aside,
blockquote,
neo,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
font,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td {
  margin: 0;
  padding: 0;
  border: 0;
  font-weight: inherit;
  font-style: inherit;
  vertical-align: baseline;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

ol,
ul {
  list-style: none;
}

figure,
article,
header,
footer,
nav,
hgroup,
video,
audio,
aside,
main {
  display: block;
}

input,
textarea {
  -webkit-appearance: none;
  appearance: none;
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  -o-border-radius: 0;
  border-radius: 0;
}

html {
  -ms-text-size-adjust: none;
  -webkit-text-size-adjust: none;
  -moz-text-size-adjust: none;
  text-size-adjust: none;
}

body,
textarea:focus,
input:focus,
a:focus {
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
}

.morphism {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

body {
  -webkit-touch-callout: none;
  background-color: #eee;
}

::-moz-selection {
  background: #023586;
  background: rgba(2, 53, 134, 1);
  color: var(--c-white);
}

::selection {
  background: #023586;
  background: rgba(2, 53, 134, 1);
  color: var(--c-white);
}

label {
  cursor: pointer;
}

input,
textarea {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

input[type="text"],
input[type="tel"],
input[type="email"],
input[type="password"],
input[type="url"],
input[type="number"],
input[type="search"],
textarea {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: none;
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  -o-border-radius: 0;
  border-radius: 0;
}

input[type="radio"],
input[type="checkbox"] {
  clip: rect(0, 0, 0, 0);
  border: 0;
  margin: 0;
}

button,
input[type="file"],
input[type="image"],
input[type="reset"],
input[type="button"],
input[type="submit"] {
  border: none;
  background: none;
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  -o-border-radius: 0;
  border-radius: 0;
  padding: 0;
  cursor: pointer;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

::-webkit-input-placeholder {
  color: #999;
}

::-moz-placeholder {
  color: #999;
}

:-ms-input-placeholder {
  color: #999;
}

input:focus::-webkit-input-placeholder,
textarea:focus::-webkit-input-placeholder {
  color: transparent;
}

input:focus::-moz-placeholder,
textarea:focus::-moz-placeholder {
  color: transparent;
}

input:focus:-ms-input-placeholder,
textarea:focus:-ms-input-placeholder {
  color: transparent;
}

input::-ms-clear {
  display: none;
  width: 0;
  height: 0;
}

input::-ms-reveal {
  display: none;
  width: 0;
  height: 0;
}

input::-webkit-search-decoration,
input::-webkit-search-cancel-button,
input::-webkit-search-results-button,
input::-webkit-search-results-decoration {
  display: none;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
  appearance: textfield;
}

select {
  border: 1px solid #111;
  -webkit-appearance: none;
  /* FF */
  -moz-appearance: none;
  /* safari chrome */
  appearance: none;
}

select::-ms-expand {
  display: none;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
textarea:-webkit-autofill:active,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus,
select:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 60px var(--c-white) inset;
}

input:-webkit-autofill {
  -webkit-text-fill-color: #111;
}


// toss css

.wrapper {
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
}
.title {
  margin: 0 0 4px;
  font-size: 24px;
  font-weight: 600;
  color: #4e5968;
}
.box_section {
  border-radius: 10px;
  color: #333d4b;
  text-align: center;
  white-space: nowrap; /* Prevent text wrapping */

  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}

pre {
  margin: 0;
}




.button {
  color: #f9fafb;
  background-color: #3182f6;
  margin-top: 30px;
  font-size: 15px;
  line-height: 18px;
  white-space: nowrap;
  text-align: center;
  cursor: pointer;
  border: 0 solid transparent;
  user-select: none;
  text-decoration: none;
  border-radius: 7px;
  padding: 11px 16px;
  width: 100%;
}

.button2 {
  font-size: 15px;
  line-height: 18px;
  white-space: nowrap;
  text-align: center;
  cursor: pointer;
  font-family: var(--f-neoR);
  border: 1px solid var(--c-line);
  user-select: none;
  text-decoration: none;
  border-radius: 4px;
  padding: 12px 16px;
}

.button2.active {
  color: var(--c-blue);
  font-family: var(--f-neoSB);
  background-color: rgb(229 239 255);
  border: 1px solid var(--c-blue);
}

#payment-method {
  margin-top: 12px;
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(2, 1fr);
}



.button:hover {
  color: #fff;
  background-color: #1b64da;
}

button:disabled,
input:disabled {
  opacity: 80%;
  cursor: not-allowed;
}



.color--grey800 {
  color: #333d4b;
  color: var(--grey800);
}

.color--grey700 {
  color: #4e5968;
  color: var(--grey700);
}

.color--grey600 {
  color: #6b7684;
  color: var(--grey600);
}

.color--grey500 {
  color: #8b95a1;
  color: var(--grey500);
}

.color--blue500 {
  color: #3182f6;
  color: var(--blue500);
}

.color--blue700 {
  color: #1b64da;
  color: var(--blue700);
}

.bg--white {
  background-color: #fff;
  background-color: var(--white);
}

.bg--grey100 {
  background-color: #f2f4f6;
  background-color: var(--grey100);
}

.bg--greyOpacity100 {
  background-color: rgba(2, 32, 71, 0.05);
  background-color: var(--greyOpacity100);
}

.bg--greyOpacity200 {
  background-color: rgba(0, 27, 55, 0.1);
  background-color: var(--greyOpacity200);
}

.bg--blue50 {
  background-color: #e8f3ff;
  background-color: var(--blue50);
}

:root {
  --padding-base-vertical: 11px;
  --padding-base-horizontal: 16px;
  --padding-t-vertical: 4px;
  --padding-t-horizontal: 8px;
  --padding-s-vertical: 7px;
  --padding-s-horizontal: 12px;
  --padding-l-vertical: 11px;
  --padding-l-horizontal: 22px;
  --padding-xl-vertical: 18px;
  --padding-xl-horizontal: 24px;
  --padding-container-base: 48px;
}

.padding--base {
  padding: 11px 16px;
  padding: var(--padding-base-vertical) var(--padding-base-horizontal);
}

.padding--t {
  padding: 4px 8px;
  padding: var(--padding-t-vertical) var(--padding-t-horizontal);
}

.padding--s {
  padding: 7px 12px;
  padding: var(--padding-s-vertical) var(--padding-s-horizontal);
}

.padding--l {
  padding: 11px 22px;
  padding: var(--padding-l-vertical) var(--padding-l-horizontal);
}

.padding--xl {
  padding: 18px 24px;
  padding: var(--padding-xl-vertical) var(--padding-xl-horizontal);
}

.text--left {
  text-align: left;
}

.text--right {
  text-align: right;
}

.text--center {
  text-align: center;
}

.text--justify {
  text-align: justify;
}

:root {
  --line-height-base: 1.6;
  --line-height-adjust: 1.3;
  --font-size-h1: 56px;
  --font-size-h2: 48px;
  --font-size-h3: 36px;
  --font-size-h4: 32px;
  --font-size-h5: 24px;
  --font-size-h6: 20px;
  --font-size-h7: 17px;
  --font-size-p: 15px;
  --font-size-sm: 13px;
  --font-size-small: 13px;
  --font-size-xsmall: 11px;
  --font-weight-bold: bold;
  --font-weight-semibold: 600;
  --font-weight-medium: 500;
  --font-weight-regular: normal;
}

.typography {
  margin: 0;
  padding: 0;
}

.typography--h1,
.typography--h2,
.typography--h3,
.typography--h4 {
  line-height: 1.3;
  line-height: var(--line-height-adjust);
}

.typography--h1 {
  font-size: 56px;
  font-size: var(--font-size-h1);
}

.typography--h2 {
  font-size: 48px;
  font-size: var(--font-size-h2);
}

.typography--h3 {
  font-size: 36px;
  font-size: var(--font-size-h3);
}

.typography--h4 {
  font-size: 32px;
  font-size: var(--font-size-h4);
}

.typography--p {
  line-height: 1.6;
  line-height: var(--line-height-base);
  font-size: 15px;
  font-size: var(--font-size-p);
}

:root {
  --checkable-size: 24px;
  --checkable-input-top: 3px;
  --checkable-input-left: 5px;
  --checkable-input-width: 14px;
  --checkable-input-height: 10px;
  --checkable-input-svg: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.343 4.574l4.243 4.243 7.07-7.071' fill='transparent' stroke-width='2' stroke='%23FFF' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  --checkable-label-text-padding: 8px;
  --indeterminate-checkable-input-top: 7px;
  --indeterminate-checkable-input-left: 5px;
  --indeterminate-checkable-input-width: 14px;
}

:root .checkable--small {
  --checkable-size: 20px;
  --checkable-input-top: 2px;
  --checkable-input-left: 4px;
  --checkable-input-width: 12px;
  --checkable-input-height: 9px;
  --checkable-input-svg: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.286 3.645l3.536 3.536 5.892-5.893' fill='transparent' stroke-width='2' stroke='%23FFF' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  --indeterminate-checkable-input-top: 5px;
  --indeterminate-checkable-input-left: 4px;
  --indeterminate-checkable-input-width: 12px;
}

.checkable {
  position: relative;
  display: flex;
}

.checkable + .checkable {
  margin-top: 12px;
}

.checkable--inline {
  display: inline-block;
}

.checkable--inline + .checkable--inline {
  margin-top: 0;
  margin-left: 18px;
}

.checkable__label {
  display: inline-block;
  max-width: 100%;
  min-height: 24px;
  min-height: var(--checkable-size);
  line-height: 1.6;
  padding-left: 24px;
  padding-left: var(--checkable-size);
  margin-bottom: 0;
  padding-top: 0;
  padding-bottom: 0;
  color: #4e5968;
  color: var(--grey700);
  cursor: pointer;
}

.checkable__input {
  position: absolute;
  margin: 0 0 0 -24px;
  margin: 0 0 0 calc(var(--checkable-size) * -1);
  top: 4px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
  cursor: pointer;
}

.checkable__input:after,
.checkable__input:before {
  content: "";
  position: absolute;
}

.checkable__input:before {
  top: -4px;
  left: 0;
  width: 24px;
  width: var(--checkable-size);
  height: 24px;
  height: var(--checkable-size);
  border: 2px solid #d1d6db;
  border: 2px solid var(--grey300);
  background-color: #fff;
  background-color: var(--white);
  transition: border-color 0.1s ease, background-color 0.1s ease;
}

.checkable__input:after {
  opacity: 0;
  transition: opacity 0.1s ease;
  top: 3px;
  top: var(--checkable-input-top);
  left: 5px;
  left: var(--checkable-input-left);
  width: 14px;
  width: var(--checkable-input-width);
  height: 10px;
  height: var(--checkable-input-height);
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.343 4.574l4.243 4.243 7.07-7.071' fill='transparent' stroke-width='2' stroke='%23FFF' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-image: var(--checkable-input-svg);
  background-repeat: no-repeat;
}

.checkable__input[type="checkbox"]:indeterminate:after {
  top: 7px;
  top: var(--indeterminate-checkable-input-top);
  left: 5px;
  left: var(--indeterminate-checkable-input-left);
  width: 14px;
  width: var(--indeterminate-checkable-input-width);
  height: 0;
  border: 1px solid #fff;
  border: 1px solid var(--white);
  border-radius: 1px;
  transform: rotate(0);
}

.checkable__input:focus {
  outline: 0;
}

.checkable__input:focus:before,
.checkable__input:hover:before {
  background-color: #e8f3ff;
  background-color: var(--blue50);
  border-color: #3182f6;
  border-color: var(--blue500);
}

.checkable__input:checked:before,
.checkable__input[type="checkbox"]:indeterminate:before {
  border-color: #3182f6;
  border-color: var(--blue500);
  background-color: #3182f6;
  background-color: var(--blue500);
}

.checkable__input:checked:after,
.checkable__input[type="checkbox"]:indeterminate:after {
  opacity: 1;
}

.checkable__input:disabled:before {
  background-color: #f2f4f6;
  background-color: var(--grey100);
  border-color: rgba(0, 23, 51, 0.02);
  border-color: var(--greyOpacity50);
}

.checkable__input:disabled:checked:before,
.checkable__input:disabled[type="checkbox"]:indeterminate:before {
  background-color: #e5e8eb;
  background-color: var(--grey200);
  border-color: #e5e8eb;
  border-color: var(--grey200);
}

.checkable__input[type="checkbox"]:before {
  border-radius: 6px;
}

.checkable__input[type="radio"]:before {
  border-radius: 12px;
}

.checkable__label-text {
  display: inline-block;
  padding-left: 8px;
  padding-left: var(--checkable-label-text-padding);
}

.checkable--disabled > .checkable__input {
  cursor: not-allowed;
}

.checkable--disabled > .checkable__label {
  color: #b0b8c1;
  color: var(--grey400);
  cursor: not-allowed;
}

.checkable--read-only {
  pointer-events: none;
}

.p-flex {
  display: flex;
}

:root {
  --pGridGutter: 24px;
}

.p-grid {
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-right: calc(var(--pGridGutter) * -1);
}

.p-grid-col {
  flex-grow: 1;
  padding-right: 24px;
  padding-right: var(--pGridGutter);
}

.p-grid-col1 {
  flex: 0 0 8.33333%;
  max-width: 8.33333%;
}

.p-grid-col2 {
  flex: 0 0 16.66667%;
  max-width: 16.66667%;
}

.p-grid-col3 {
  flex: 0 0 25%;
  max-width: 25%;
}

.p-grid-col4 {
  flex: 0 0 33.33333%;
  max-width: 33.33333%;
}

.p-grid-col5 {
  flex: 0 0 41.66667%;
  max-width: 41.66667%;
}

`;

export default Global;

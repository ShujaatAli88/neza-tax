<title>Legal Revisions — Draft for Review</title>

**Status: DRAFT ONLY. Not published to the live site. Not reviewed by an attorney.**

This file proposes redlined changes to `/legal/privacy` (`src/content/privacy.ts`) and
`/legal/terms` (`src/content/terms.ts`) per the client's revision list. Nothing here has
been applied to those files. Recommend counsel review before any of it goes live —
particularly the CCPA/CPRA reword (a legal-applicability judgment call, not a copy
edit) and the new insurance/mortgage disclaimers.

---

## Privacy Policy (`/legal/privacy`)

### 1. CCPA/CPRA — stop asserting the law applies

**Why:** The current text says the CCPA/CPRA "gives you the right to" X, Y, Z, which
reads as an affirmative statement that the business is subject to the CCPA. Given the
size of the operation, that may not be true, and asserting it creates an unforced
compliance obligation.

**Before** (`"Your Rights (Including California Residents)"`):
> To the extent applicable, if you are a California resident, the California Consumer
> Privacy Act (CCPA), as amended by the California Privacy Rights Act (CPRA), gives you
> the right to know what personal information we collect about you, request deletion of
> your personal information, correct inaccurate personal information, and opt out of the
> sale or sharing of personal information — though we do not sell or share personal
> information as defined under CCPA/CPRA.
>
> To exercise any of these rights, contact us using the information below. We will not
> discriminate against you for exercising your privacy rights.

**After:**
> California law provides certain privacy protections to California residents.
> Depending on the size and nature of a business's operations, some or all of the
> California Consumer Privacy Act (CCPA), as amended by the California Privacy Rights
> Act (CPRA), may or may not apply to us. To the extent CCPA/CPRA rights do apply, they
> may include the right to know what personal information we collect, request deletion
> of your personal information, correct inaccurate personal information, and opt out of
> the sale or sharing of personal information. We do not sell or share personal
> information as defined under the CCPA/CPRA.
>
> If you have questions about your privacy rights or would like to make a
> privacy-related request, contact us using the information below and we will respond
> appropriately under applicable law. We will not discriminate against you for making
> such a request.

### 2. New: SMS / text-message language

**Why:** The site prominently offers Call / Text. Nothing currently addresses SMS
consent, which matters more the moment automated appointment confirmations or business
texting gets added.

**New section, "Text Messaging":**
> If you contact us by text message or provide a mobile phone number, we do not sell or
> share your mobile number or SMS consent information with third parties for marketing
> or promotional purposes. Message and data rates may apply. You may opt out of text
> communications at any time by replying STOP, or by contacting us using the
> information below.

### 3. Third-party service providers — name the categories

**Why:** The "Sharing With C2 Financial Corporation" section's second sentence falls
back to a vague "as necessary to provide services," when the actual categories are
already itemized two sections later in "Service Providers." Point to them instead of
repeating a general catch-all.

**Before** (`"Sharing With C2 Financial Corporation"`, second bullet):
> We do not share your information with other third parties except as necessary to
> provide the services you request, to comply with the law, or to protect our legal
> rights.

**After:**
> Apart from the mortgage-related sharing described above, we only share your
> information with the categories of service providers described below under "Service
> Providers," or as required to comply with the law or protect our legal rights. We do
> not sell your information to other third parties.

*(The existing "Service Providers" section already names the categories — website
hosting, form submission and processing, email delivery, appointment scheduling, and
website analytics — no change needed there.)*

### 4. New: Data Security

**New section, "Data Security":**
> We maintain reasonable administrative, technical, and organizational safeguards
> designed to protect the personal information we collect from unauthorized access,
> use, disclosure, alteration, or destruction. No method of transmission over the
> internet or method of electronic storage is completely secure, and we cannot
> guarantee absolute security.

### 5. C2 Financial disclosure — unchanged

Per the client's instruction, the existing "Sharing With C2 Financial Corporation"
first paragraph (the actual disclosure of what's shared and why) is left as-is. Only
its second sentence changes, per item 3 above.

### Proposed full section order (privacy.ts)

1. Information We Collect *(unchanged)*
2. How We Use Your Information *(unchanged)*
3. Sharing With C2 Financial Corporation *(second sentence reworded, §3)*
4. Service Providers *(unchanged)*
5. **Data Security** *(new, §4)*
6. Data Retention *(unchanged)*
7. Cookies and Analytics *(unchanged)*
8. **Text Messaging** *(new, §2)*
9. Your Rights (Including California Residents) *(reworded, §1)*
10. Contact Us About Privacy *(unchanged)*

---

## Terms of Use (`/legal/terms`)

### 1. Split the tax/business/insurance disclaimer out of the mortgage section

**Why:** It currently sits under "No Guarantee of Loan Approval; Not an Offer to
Lend" — the wrong heading for a disclaimer about tax, business, and insurance content.

**Before** (`"No Guarantee of Loan Approval; Not an Offer to Lend"`, second bullet):
> Information about tax, business, and insurance services on this site is general in
> nature and is not a substitute for advice specific to your individual situation.

**After:** *(remove that bullet from the mortgage section; replace with a new,
dedicated section)*

**New section, "General Information; Not Professional Advice":**
> Tax information provided on this website is general in nature and should not be
> relied upon as tax advice for a particular transaction or situation. Tax laws and
> regulations may change, and individual circumstances vary.
>
> Information about business and insurance services on this site is likewise general in
> nature and is not a substitute for advice specific to your individual situation.

### 2. New: Insurance disclaimer

**Why:** Warranted given life, health, and Medicare-related services are offered.

**New section, "Insurance Disclaimer":**
> Insurance products, availability, eligibility, benefits and premiums vary by carrier
> and individual circumstances, and coverage is subject to the applicable policy terms
> and carrier approval. Nothing on this website is a guarantee of coverage, and no
> insurance coverage is bound, altered, or cancelled through use of this website.

### 3. New: No Client Relationship

**Why:** Visitors can contact and schedule directly through the site (contact form,
booking, text), so it should be explicit that doing so doesn't by itself create a
professional relationship.

**Before** (`"Use of This Site"`, second bullet — moves out into its own section):
> Submitting an inquiry or appointment request through this website does not create a
> client, tax preparer-client, insurance agent-client, or mortgage lending relationship.

**After:** *(remove that bullet from "Use of This Site"; replace with a new, dedicated
section)*

**New section, "No Client Relationship":**
> Submitting a contact form, requesting an appointment, sending a text message, or
> otherwise browsing or using this website does not, by itself, create a client, tax
> preparer-client, insurance agent-client, or mortgage lending relationship with Neza
> Financial Group LLC, Jose Gonzalez, or C2 Financial Corporation. A professional
> relationship is established only once confirmed directly with our office.

### 4. Strengthen the mortgage section

**Addition to "No Guarantee of Loan Approval; Not an Offer to Lend"** (after the
existing NMLS/underwriting sentence):
> Rates, programs, fees, terms, and availability are subject to change without notice.

### 5. New: Changes to These Terms

**New section, "Changes to These Terms":**
> We may update these Terms of Use from time to time. The "Last Updated" date at the
> top of this page reflects the most recent revision. Continued use of this site after
> changes are posted constitutes acceptance of the updated terms.

### 6. Intellectual Property — third-party marks

**Addition to "Intellectual Property"** (new sentence at the end):
> Certain trademarks, logos, and other third-party materials displayed on the site —
> including CTEC, IRS e-file, Covered California, Equal Housing Opportunity, and NMLS
> marks — are the property of their respective owners.

### Proposed full section order (terms.ts)

1. Use of This Site *(trimmed — client-relationship sentence moved out, §3)*
2. **No Client Relationship** *(new, §3)*
3. No Guarantee of Loan Approval; Not an Offer to Lend *(trimmed + strengthened, §1 + §4)*
4. **General Information; Not Professional Advice** *(new, §1)*
5. **Insurance Disclaimer** *(new, §2)*
6. Third-Party Links *(unchanged)*
7. Intellectual Property *(extended, §6)*
8. Limitation of Liability *(unchanged)*
9. **Changes to These Terms** *(new, §5)*
10. Governing Law *(unchanged)*
11. Contact Us *(unchanged)*

---

## Next step

Once the client and/or counsel sign off on the language above, apply it directly to
`PRIVACY_SECTIONS` in `src/content/privacy.ts` and `TERMS_SECTIONS` in
`src/content/terms.ts`, in the section order shown, and bump the "Last Updated" date on
both pages.

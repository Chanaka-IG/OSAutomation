# Recruitment — Vacancy Test Plan

## Application Overview

The Vacancies screen (Recruitment → Vacancies, `/web/index.php/recruitment/viewJobVacancy`) lets an admin manage job vacancies: search/filter existing vacancies (by Job Title, Vacancy, Hiring Manager, Status), add a vacancy (`/recruitment/addJobVacancy`), edit it (`/recruitment/addJobVacancy/{id}`), and delete it (single row action or bulk). A vacancy has a unique name (max 50 chars), a job title (from Admin master data), an optional description, a hiring manager (employee autocomplete), an optional number of positions (numeric), an Active toggle (off ⇒ status "Closed"), and a "Publish in RSS Feed and Web Page" toggle that exposes public RSS/Web URLs.

## Verified Application Facts (from live exploration on 2026-07-18)

- Empty save shows `Required` under **Vacancy Name**, **Job Title**, **Hiring Manager** (error element: `span.oxd-input-field-error-message` inside the field's `.oxd-input-group`).
- Vacancy Name longer than 50 chars → `Should not exceed 50 characters`.
- Free-typed Hiring Manager (no suggestion selected) → `Invalid`.
- Non-numeric Number of Positions → `Should be a numeric value`.
- Duplicate Vacancy Name → `Already exists` (appears asynchronously ~1s after Save).
- Successful **add**: redirect to `addJobVacancy/{id}` with heading **Edit Vacancy** and all values retained. **No observable success toast on the add-save** (confirmed during generation — the toast wait times out; assert the redirect instead). Saving from the Edit page (no navigation) does toast `Successfully Saved` (not "Updated").
- The list's Hiring Manager column and the Hiring Manager filter dropdown show the manager **without the middle name** ("Rachel Green"), while the add/edit form autocomplete holds the full name ("Rachel Karen Green").
- Record count label is singular/plural: `(1) Record Found` vs `(3) Records Found`.
- Bulk delete (confirmed): header-row checkbox selects all, a ` Delete Selected` button appears, same "Are you Sure?" dialog, toast `Successfully Deleted`.
- Job Title options come from master data (e.g. Software Engineer, QA Engineer, Senior Software Engineer…). Status filter options: `Active`, `Closed`.
- Active/Publish toggles are `oxd-switch` controls: the `<input type="checkbox">` is covered by `span.oxd-switch-input` — click the span; `check()`/`uncheck()` on the input times out.
- List shows `(N) Record Found`; an unmatched filter shows table text `No Records Found` **and** an Info toast `No Records Found`.
- Row actions: trash (`i.bi-trash`) and pencil (`i.bi-pencil-fill`). Delete confirmation dialog: `Are you Sure?` / `The selected record will be permanently deleted. Are you sure you want to continue?` with `No, Cancel` and ` Yes, Delete` (leading space in accessible name). Confirm → toast `Successfully Deleted`.
- Deactivating a vacancy (Active off) shows Status `Closed` in the list.

## Test Scenarios

### 1. Add Vacancy — Positive

**Seed:** admin login + navigate Recruitment → Vacancies → Add (repo convention: `beforeEach` with `page.goto("/")`, `loginasAdmin()`, then page-object navigation)

#### 1.1. should-add-vacancy-with-all-fields

**File:** `tests/recruitment/should-add-vacancy-with-all-fields.spec.ts`

**Steps:**
  1. Click Add on the Vacancies list
    - expect: heading "Add Vacancy" is visible; Active and Publish toggles are ON by default
  2. Fill Vacancy Name, select a Job Title, type a Description, type a Hiring Manager prefix and pick the suggestion, fill Number of Positions with a valid number
  3. Click Save
    - expect: toast "Success / Successfully Saved"
    - expect: URL matches `addJobVacancy/{id}` and heading "Edit Vacancy" is visible
    - expect: all entered values are retained in the form

#### 1.2. should-add-vacancy-with-only-mandatory-fields

**File:** `tests/recruitment/should-add-vacancy-with-only-mandatory-fields.spec.ts`

**Steps:**
  1. On Add Vacancy, fill only Vacancy Name, Job Title, Hiring Manager
  2. Click Save
    - expect: toast "Successfully Saved" and redirect to Edit Vacancy

#### 1.3. should-display-added-vacancy-in-list

**File:** `tests/recruitment/should-display-added-vacancy-in-list.spec.ts`

**Steps:**
  1. Add a vacancy (mandatory fields)
  2. Navigate back to the Vacancies list
    - expect: a row with cells Vacancy Name, Job Title, Hiring Manager, Status "Active"
    - expect: record count label "(N) Record Found" incremented

#### 1.4. should-add-closed-vacancy-when-active-toggle-off

**File:** `tests/recruitment/should-add-closed-vacancy-when-active-toggle-off.spec.ts`

**Steps:**
  1. On Add Vacancy, fill mandatory fields and switch OFF the Active toggle (click the `oxd-switch` span)
  2. Save and open the Vacancies list
    - expect: the new vacancy row shows Status "Closed"

#### 1.5. should-show-rss-and-webpage-urls-when-publish-enabled

**File:** `tests/recruitment/should-show-rss-and-webpage-urls-when-publish-enabled.spec.ts`

**Steps:**
  1. Open Add Vacancy (Publish toggle ON by default)
    - expect: "RSS Feed URL :" link ending `/recruitmentApply/jobs.rss` is visible
    - expect: "Web Page URL :" link ending `/recruitmentApply/jobs.html` is visible
  2. Switch OFF the Publish toggle
    - expect: the RSS/Web Page URL links are hidden

### 2. Add Vacancy — Negative / Validation

**Seed:** admin login + navigate to Add Vacancy

#### 2.1. should-show-required-errors-on-empty-save

**File:** `tests/recruitment/should-show-required-errors-on-empty-save.spec.ts`

**Steps:**
  1. Click Save with no fields filled
    - expect: "Required" under Vacancy Name
    - expect: "Required" under Job Title
    - expect: "Required" under Hiring Manager
    - expect: no error under Description / Number of Positions (optional fields)
    - expect: still on `addJobVacancy` (no navigation)

#### 2.2. should-show-error-for-duplicate-vacancy-name

**File:** `tests/recruitment/should-show-error-for-duplicate-vacancy-name.spec.ts`

**Steps:**
  1. Add a vacancy with a unique name (prerequisite via UI or API)
  2. Open Add Vacancy again and type the same Vacancy Name, then click Save
    - expect: "Already exists" under Vacancy Name (async — wait for the message)

#### 2.3. should-show-invalid-error-for-unlisted-hiring-manager

**File:** `tests/recruitment/should-show-invalid-error-for-unlisted-hiring-manager.spec.ts`

**Steps:**
  1. Type a name that matches no employee into Hiring Manager (do not select a suggestion — autocomplete shows "No Records Found")
  2. Click Save
    - expect: "Invalid" under Hiring Manager

#### 2.4. should-show-error-for-non-numeric-positions

**File:** `tests/recruitment/should-show-error-for-non-numeric-positions.spec.ts`

**Steps:**
  1. Fill Number of Positions with "abc"
  2. Click Save
    - expect: "Should be a numeric value" under Number of Positions

#### 2.5. should-show-error-when-name-exceeds-50-characters

**File:** `tests/recruitment/should-show-error-when-name-exceeds-50-characters.spec.ts`

**Steps:**
  1. Fill Vacancy Name with a 51+ character string
  2. Click Save
    - expect: "Should not exceed 50 characters" under Vacancy Name

### 3. Add Vacancy — Edge Cases

**Seed:** admin login + navigate to Add Vacancy

#### 3.1. should-accept-vacancy-name-of-exactly-50-characters

**File:** `tests/recruitment/should-accept-vacancy-name-of-exactly-50-characters.spec.ts`

**Steps:**
  1. Fill Vacancy Name with exactly 50 characters, fill other mandatory fields
  2. Click Save
    - expect: no length error; toast "Successfully Saved"

#### 3.2. should-reject-whitespace-only-vacancy-name

**File:** `tests/recruitment/should-reject-whitespace-only-vacancy-name.spec.ts`

**Steps:**
  1. Fill Vacancy Name with spaces only, fill other mandatory fields, click Save
    - expect: "Required" under Vacancy Name (input is trimmed) — to confirm during generation

#### 3.3. should-accept-special-characters-in-vacancy-name

**File:** `tests/recruitment/should-accept-special-characters-in-vacancy-name.spec.ts`

**Steps:**
  1. Fill Vacancy Name like `C++/C# Engineer (Sr.) - 2026!`, other mandatory fields, Save
    - expect: toast "Successfully Saved" and value retained verbatim on Edit Vacancy

#### 3.4. should-handle-zero-and-large-number-of-positions

**File:** `tests/recruitment/should-handle-zero-and-large-number-of-positions.spec.ts`

**Steps:**
  1. Save a vacancy with Number of Positions "0", then edit to a large value (e.g. "9999")
    - expect: both values accepted or a validation message shown — capture actual behaviour during generation

#### 3.5. should-not-save-when-cancel-clicked

**File:** `tests/recruitment/should-not-save-when-cancel-clicked.spec.ts`

**Steps:**
  1. Fill mandatory fields on Add Vacancy, click Cancel
    - expect: navigation back to the Vacancies list
    - expect: no row with the entered Vacancy Name; record count unchanged

### 4. Vacancy List — Search, Filter, Reset

**Seed:** admin login + at least one known vacancy present (create via prerequisite) + navigate to Vacancies list

#### 4.1. should-filter-vacancies-by-job-title

**File:** `tests/recruitment/should-filter-vacancies-by-job-title.spec.ts`

**Steps:**
  1. Select the known vacancy's Job Title in the filter, click Search
    - expect: "(1) Record Found" and the row shows the expected Vacancy/Job Title/Hiring Manager/Status cells

#### 4.2. should-filter-vacancies-by-status

**File:** `tests/recruitment/should-filter-vacancies-by-status.spec.ts`

**Steps:**
  1. Select Status "Active", click Search
    - expect: only rows with Status "Active"
  2. Select Status "Closed", click Search
    - expect: only rows with Status "Closed" (or No Records Found if none)

#### 4.3. should-filter-vacancies-by-vacancy-name

**File:** `tests/recruitment/should-filter-vacancies-by-vacancy-name.spec.ts`

**Steps:**
  1. Select the known vacancy in the Vacancy filter dropdown, click Search
    - expect: "(1) Record Found" with the matching row

#### 4.4. should-filter-vacancies-by-hiring-manager

**File:** `tests/recruitment/should-filter-vacancies-by-hiring-manager.spec.ts`

**Steps:**
  1. Select the known Hiring Manager in the filter, click Search
    - expect: all returned rows show that Hiring Manager

#### 4.5. should-show-no-records-for-unmatched-filter

**File:** `tests/recruitment/should-show-no-records-for-unmatched-filter.spec.ts`

**Steps:**
  1. Select a Job Title that has no vacancies, click Search
    - expect: table area shows "No Records Found"
    - expect: Info toast "No Records Found"

#### 4.6. should-reset-filters-and-restore-full-list

**File:** `tests/recruitment/should-reset-filters-and-restore-full-list.spec.ts`

**Steps:**
  1. Apply a filter that narrows/empties the result, then click Reset
    - expect: all filter dropdowns return to "-- Select --"
    - expect: full record count restored

### 5. Edit Vacancy

**Seed:** admin login + a known vacancy present + navigate to Vacancies list

#### 5.1. should-load-existing-values-in-edit-form

**File:** `tests/recruitment/should-load-existing-values-in-edit-form.spec.ts`

**Steps:**
  1. Click the pencil icon on the known vacancy's row
    - expect: URL `addJobVacancy/{id}`, heading "Edit Vacancy"
    - expect: Vacancy Name, Job Title, Description, Hiring Manager, Number of Positions match the stored values

#### 5.2. should-update-vacancy-details

**File:** `tests/recruitment/should-update-vacancy-details.spec.ts`

**Steps:**
  1. Open the vacancy in edit mode, change Vacancy Name and Number of Positions, click Save
    - expect: toast "Successfully Saved" (note: edit also says "Saved", not "Updated")
    - expect: list row reflects the new name

#### 5.3. should-deactivate-vacancy-and-show-closed-status

**File:** `tests/recruitment/should-deactivate-vacancy-and-show-closed-status.spec.ts`

**Steps:**
  1. Open the vacancy in edit mode, switch OFF Active (click the `oxd-switch` span), click Save
    - expect: toast "Successfully Saved"
  2. Return to the Vacancies list
    - expect: the row's Status cell shows "Closed"

#### 5.4. should-show-duplicate-error-when-renaming-to-existing-vacancy

**File:** `tests/recruitment/should-show-duplicate-error-when-renaming-to-existing-vacancy.spec.ts`

**Steps:**
  1. With two vacancies A and B present, edit B and set its name to A's name, click Save
    - expect: "Already exists" under Vacancy Name

### 6. Delete Vacancy

**Seed:** admin login + a known vacancy present + navigate to Vacancies list

#### 6.1. should-keep-vacancy-when-delete-cancelled

**File:** `tests/recruitment/should-keep-vacancy-when-delete-cancelled.spec.ts`

**Steps:**
  1. Click the trash icon on the vacancy's row
    - expect: dialog "Are you Sure?" with text "The selected record will be permanently deleted. Are you sure you want to continue?"
  2. Click "No, Cancel"
    - expect: dialog closes and the row is still present

#### 6.2. should-delete-vacancy-from-row-action

**File:** `tests/recruitment/should-delete-vacancy-from-row-action.spec.ts`

**Steps:**
  1. Click the trash icon on the vacancy's row and click "Yes, Delete"
    - expect: toast "Success / Successfully Deleted"
    - expect: the row is removed (list shows "No Records Found" if it was the only record)

#### 6.3. should-bulk-delete-selected-vacancies

**File:** `tests/recruitment/should-bulk-delete-selected-vacancies.spec.ts`

**Steps:**
  1. With two vacancies present, tick their row checkboxes
    - expect: a "Delete Selected" button appears above the table — confirm label during generation
  2. Click it and confirm in the dialog
    - expect: toast "Successfully Deleted" and both rows removed

## Notes for Generation

- Follow repo conventions: page object in `pages/Recruitment/VacancyPage.ts` extending `BasePage`, data in `data/Recruitment/vacancy.ts`, spec(s) in `tests/recruitment/`, fixtures import from `Fixtures/logger.fixtures`, API prerequisites + `TestStateManager` for employee/vacancy setup (hiring manager must be an existing employee).
- Master data global setup currently 422s on duplicate `employeeId` in this environment — run with `RUN_MASTER_DATA=false`.
- The repo's practice is numbered tests grouped in one spec per feature rather than one file per scenario; adjust file mapping to match if preferred.
- Scenarios marked "confirm during generation" (3.2, 3.4, 6.3 button label) were not fully exercised live; verify against the app while generating.

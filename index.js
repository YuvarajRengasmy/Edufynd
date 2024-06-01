import React from "react";

const App = () => {
  return (
    <>

<div className="row">
  <div className="col-xl-12">
    <div className="card">
      <div className="card-header justify-content-between d-sm-flex d-block">
        <div className="card-title">
          Input Types
        </div>
        <div className="prism-toggle mt-2 mt-sm-0">
          <button type="button" className="btn btn-sm btn-primary-light">Show Code<i className="ri-code-line ms-2 d-inline-block align-middle" /></button>
        </div>
      </div>
      <div className="card-body">
        <div className="row gy-4">
          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
            <p className="mb-2 text-muted">Basic Input:</p>
            <input type="text" className="form-control" id="input" />
          </div>
          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
            <label htmlFor="input-label" className="form-label">Form Input With Label</label>
            <input type="text" className="form-control" id="input-label" />
          </div>
          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
            <label htmlFor="input-placeholder" className="form-label">Form Input With Placeholder</label>
            <input type="text" className="form-control" id="input-placeholder" placeholder="Placeholder" />
          </div>
          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
            <label htmlFor="input-text" className="form-label">Type Text</label>
            <input type="text" className="form-control" id="input-text" placeholder="Text" />
          </div>
          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
            <label htmlFor="input-number" className="form-label">Type Number</label>
            <input type="number" className="form-control" id="input-number" placeholder="Number" />
          </div>
          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
            <label htmlFor="input-password" className="form-label">Type Password</label>
            <input type="password" className="form-control" id="input-password" placeholder="Password" />
          </div>
          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
            <label htmlFor="input-email" className="form-label">Type Email</label>
            <input type="email" className="form-control" id="input-email" placeholder="Email@xyz.com" />
          </div>
          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
            <label htmlFor="input-tel" className="form-label">Type Tel</label>
            <input type="tel" className="form-control" id="input-tel" placeholder="+1100-2031-1233" />
          </div>
          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
            <label htmlFor="input-date" className="form-label">Type Date</label>
            <input type="date" className="form-control" id="input-date" />
          </div>
          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
            <label htmlFor="input-week" className="form-label">Type Week</label>
            <input type="week" className="form-control" id="input-week" />
          </div>
          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
            <label htmlFor="input-month" className="form-label">Type Month</label>
            <input type="month" className="form-control" id="input-month" />
          </div>
          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
            <label htmlFor="input-time" className="form-label">Type Time</label>
            <input type="time" className="form-control" id="input-time" />
          </div>
          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
            <label htmlFor="input-datetime-local" className="form-label">Type datetime-local</label>
            <input type="datetime-local" className="form-control" id="input-datetime-local" />
          </div>
          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
            <label htmlFor="input-search" className="form-label">Type Search</label>
            <input type="search" className="form-control" id="input-search" placeholder="Search" />
          </div>
          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
            <label htmlFor="input-submit" className="form-label">Type Submit</label>
            <input type="submit" className="form-control" id="input-submit" defaultValue="Submit" />
          </div>
          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
            <label htmlFor="input-reset" className="form-label">Type Reset</label>
            <input type="reset" className="form-control" id="input-reset" />
          </div>
          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
            <label htmlFor="input-button" className="form-label">Type Button</label>
            <input type="button" className="form-control btn btn-primary" id="input-button" defaultValue="Button" />
          </div>
          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
            <div className="row gap-2 gap-xl-0">
              <div className="col-xl-3">
                <label className="form-label">Type Color</label>
                <input className="form-control form-input-color" type="color" defaultValue="#136bd0" />
              </div>
              <div className="col-xl-5">
                <div className="form-check ps-xl-3 ps-0">
                  <p className="mb-3 px-0 text-muted">Type Checkbox</p>
                  <input className="form-check-input ms-2" type="checkbox" defaultValue defaultChecked />
                </div>
              </div>
              <div className="col-xl-4">
                <div className="form-check ps-xl-3 ps-0">
                  <p className="mb-3 px-0 text-muted">Type Radio</p>
                  <input className="form-check-input ms-2" type="radio" defaultChecked />
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
            <label htmlFor="input-file" className="form-label">Type File</label>
            <input className="form-control" type="file" id="input-file" />
          </div>
          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
            <label className="form-label">Type Url</label>
            <input className="form-control" type="url" name="website" placeholder="http://example.com" />
          </div>
          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
            <label htmlFor="input-disabled" className="form-label">Type Disabled</label>
            <input type="text" id="input-disabled" className="form-control" placeholder="Disabled input" disabled />
          </div>
          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
            <label htmlFor="input-readonlytext" className="form-label">Input Readonly Text</label>
            <input type="text" readOnly className="form-control-plaintext" id="input-readonlytext" defaultValue="email@example.com" />
          </div>
          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
            <label htmlFor="disabled-readonlytext" className="form-label">Disabled Readonly Input</label>
            <input className="form-control" type="text" defaultValue="Disabled readonly input" id="disabled-readonlytext" aria-label="Disabled input example" disabled readOnly />
          </div>
          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
            <label className="form-label">Type Readonly Input</label>
            <input className="form-control" type="text" defaultValue="Readonly input here..." aria-label="readonly input example" readOnly />
          </div>
          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
            <label htmlFor="text-area" className="form-label">Textarea</label>
            <textarea className="form-control" id="text-area" rows={1} defaultValue={""} />
          </div>
          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
            <label htmlFor="input-DataList" className="form-label">Datalist example</label>
            <input className="form-control" list="datalistOptions" id="input-DataList" placeholder="Type to search..." />
            <datalist id="datalistOptions">
              <option value="San Francisco">
              </option>
              <option value="New York">
              </option>
              <option value="Seattle">
              </option>
              <option value="Los Angeles">
              </option>
              <option value="Chicago">
              </option>
            </datalist>
          </div>
        </div>
      </div>
      <div className="card-footer d-none border-top-0">
        {/* Prism Code */}
        <pre className="language-html"><code className="language-html">&lt;div class="row gy-4"&gt;{"\n"}{"    "}&lt;div class="col-xl-4 col-lg-6 col-md-6 col-sm-12"&gt;{"\n"}{"        "}&lt;p class="mb-2 text-muted"&gt;Basic Input:&lt;/p&gt;{"\n"}{"        "}&lt;input type="text" class="form-control" id="input"&gt;{"\n"}{"    "}&lt;/div&gt;{"\n"}{"    "}&lt;div class="col-xl-4 col-lg-6 col-md-6 col-sm-12"&gt;{"\n"}{"        "}&lt;label for="input-label" class="form-label"&gt;Form Input With Label&lt;/label&gt;{"\n"}{"        "}&lt;input type="text" class="form-control" id="input-label"&gt;{"\n"}{"    "}&lt;/div&gt;{"\n"}{"    "}&lt;div class="col-xl-4 col-lg-6 col-md-6 col-sm-12"&gt;{"\n"}{"        "}&lt;label for="input-placeholder" class="form-label"&gt;Form Input With Placeholder&lt;/label&gt;{"\n"}{"        "}&lt;input type="text" class="form-control" id="input-placeholder" placeholder="Placeholder"&gt;{"\n"}{"    "}&lt;/div&gt;{"\n"}{"    "}&lt;div class="col-xl-4 col-lg-6 col-md-6 col-sm-12"&gt;{"\n"}{"        "}&lt;label for="input-text" class="form-label"&gt;Type Text&lt;/label&gt;{"\n"}{"        "}&lt;input type="text" class="form-control" id="input-text" placeholder="Text"&gt;{"\n"}{"    "}&lt;/div&gt;{"\n"}{"    "}&lt;div class="col-xl-4 col-lg-6 col-md-6 col-sm-12"&gt;{"\n"}{"        "}&lt;label for="input-number" class="form-label"&gt;Type Number&lt;/label&gt;{"\n"}{"        "}&lt;input type="number" class="form-control" id="input-number" placeholder="Number"&gt;{"\n"}{"    "}&lt;/div&gt;{"\n"}{"    "}&lt;div class="col-xl-4 col-lg-6 col-md-6 col-sm-12"&gt;{"\n"}{"        "}&lt;label for="input-password" class="form-label"&gt;Type Password&lt;/label&gt;{"\n"}{"        "}&lt;input type="password" class="form-control" id="input-password" placeholder="Password"&gt;{"\n"}{"    "}&lt;/div&gt;{"\n"}{"    "}&lt;div class="col-xl-4 col-lg-6 col-md-6 col-sm-12"&gt;{"\n"}{"        "}&lt;label for="input-email" class="form-label"&gt;Type Email&lt;/label&gt;{"\n"}{"        "}&lt;input type="email" class="form-control" id="input-email" placeholder="Email@xyz.com"&gt;{"\n"}{"    "}&lt;/div&gt;{"\n"}{"    "}&lt;div class="col-xl-4 col-lg-6 col-md-6 col-sm-12"&gt;{"\n"}{"        "}&lt;label for="input-tel" class="form-label"&gt;Type Tel&lt;/label&gt;{"\n"}{"        "}&lt;input type="tel" class="form-control" id="input-tel" placeholder="+1100-2031-1233"&gt;{"\n"}{"    "}&lt;/div&gt;{"\n"}{"    "}&lt;div class="col-xl-4 col-lg-6 col-md-6 col-sm-12"&gt;{"\n"}{"        "}&lt;label for="input-date" class="form-label"&gt;Type Date&lt;/label&gt;{"\n"}{"        "}&lt;input type="date" class="form-control" id="input-date"&gt;{"\n"}{"    "}&lt;/div&gt;{"\n"}{"    "}&lt;div class="col-xl-4 col-lg-6 col-md-6 col-sm-12"&gt;{"\n"}{"        "}&lt;label for="input-week" class="form-label"&gt;Type Week&lt;/label&gt;{"\n"}{"        "}&lt;input type="week" class="form-control" id="input-week"&gt;{"\n"}{"    "}&lt;/div&gt;{"\n"}{"    "}&lt;div class="col-xl-4 col-lg-6 col-md-6 col-sm-12"&gt;{"\n"}{"        "}&lt;label for="input-month" class="form-label"&gt;Type Month&lt;/label&gt;{"\n"}{"        "}&lt;input type="month" class="form-control" id="input-month"&gt;{"\n"}{"    "}&lt;/div&gt;{"\n"}{"    "}&lt;div class="col-xl-4 col-lg-6 col-md-6 col-sm-12"&gt;{"\n"}{"        "}&lt;label for="input-time" class="form-label"&gt;Type Time&lt;/label&gt;{"\n"}{"        "}&lt;input type="time" class="form-control" id="input-time"&gt;{"\n"}{"    "}&lt;/div&gt;{"\n"}{"    "}&lt;div class="col-xl-4 col-lg-6 col-md-6 col-sm-12"&gt;{"\n"}{"        "}&lt;label for="input-datetime-local" class="form-label"&gt;Type datetime-local&lt;/label&gt;{"\n"}{"        "}&lt;input type="datetime-local" class="form-control" id="input-datetime-local"&gt;{"\n"}{"    "}&lt;/div&gt;{"\n"}{"    "}&lt;div class="col-xl-4 col-lg-6 col-md-6 col-sm-12"&gt;{"\n"}{"        "}&lt;label for="input-search" class="form-label"&gt;Type Search&lt;/label&gt;{"\n"}{"        "}&lt;input type="search" class="form-control" id="input-search" placeholder="Search"&gt;{"\n"}{"    "}&lt;/div&gt;{"\n"}{"    "}&lt;div class="col-xl-4 col-lg-6 col-md-6 col-sm-12"&gt;{"\n"}{"        "}&lt;label for="input-submit" class="form-label"&gt;Type Submit&lt;/label&gt;{"\n"}{"        "}&lt;input type="submit" class="form-control" id="input-submit" value="Submit"&gt;{"\n"}{"    "}&lt;/div&gt;{"\n"}{"    "}&lt;div class="col-xl-4 col-lg-6 col-md-6 col-sm-12"&gt;{"\n"}{"        "}&lt;label for="input-reset" class="form-label"&gt;Type Reset&lt;/label&gt;{"\n"}{"        "}&lt;input type="reset" class="form-control" id="input-reset"&gt;{"\n"}{"    "}&lt;/div&gt;{"\n"}{"    "}&lt;div class="col-xl-4 col-lg-6 col-md-6 col-sm-12"&gt;{"\n"}{"        "}&lt;label for="input-button" class="form-label"&gt;Type Button&lt;/label&gt;{"\n"}{"        "}&lt;input type="button" class="form-control btn btn-primary" id="input-button"{"  "}value="Button"&gt;{"\n"}{"    "}&lt;/div&gt;{"\n"}{"    "}&lt;div class="col-xl-4 col-lg-6 col-md-6 col-sm-12"&gt;{"\n"}{"        "}&lt;div class="row"&gt;{"\n"}{"            "}&lt;div class="col-xl-4"&gt;{"\n"}{"                "}&lt;label class="form-label"&gt;Type Color&lt;/label&gt;{"\n"}{"                "}&lt;input class="form-control form-input-color" type="color" value="#136bd0"&gt;{"\n"}{"            "}&lt;/div&gt;{"\n"}{"            "}&lt;div class="col-xl-4"&gt;{"\n"}{"                "}&lt;div class="form-check"&gt;{"\n"}{"                    "}&lt;p class="mb-3 px-0 text-muted"&gt;Type Checkbox&lt;/p&gt;{"\n"}{"                    "}&lt;input class="form-check-input ms-2" type="checkbox" value="" checked&gt;{"\n"}{"                "}&lt;/div&gt;{"\n"}{"            "}&lt;/div&gt;{"\n"}{"            "}&lt;div class="col-xl-3"&gt;{"\n"}{"                "}&lt;div class="form-check"&gt;{"\n"}{"                    "}&lt;p class="mb-3 px-0 text-muted"&gt;Type Radio&lt;/p&gt;{"\n"}{"                    "}&lt;input class="form-check-input ms-2" type="radio" checked&gt;{"\n"}{"                "}&lt;/div&gt;{"\n"}{"            "}&lt;/div&gt;{"\n"}{"        "}&lt;/div&gt;{"\n"}{"    "}&lt;/div&gt;{"\n"}{"    "}&lt;div class="col-xl-4 col-lg-6 col-md-6 col-sm-12"&gt;{"\n"}{"        "}&lt;label for="input-file" class="form-label"&gt;Type File&lt;/label&gt;{"\n"}{"        "}&lt;input class="form-control" type="file" id="input-file"&gt;{"\n"}{"    "}&lt;/div&gt;{"\n"}{"    "}&lt;div class="col-xl-4 col-lg-6 col-md-6 col-sm-12"&gt;{"\n"}{"        "}&lt;label class="form-label"&gt;Type Url&lt;/label&gt;{"\n"}{"        "}&lt;input class="form-control" type="url"{"  "}name="website" placeholder="http://example.com"&gt;{"\n"}{"    "}&lt;/div&gt;{"\n"}{"    "}&lt;div class="col-xl-4 col-lg-6 col-md-6 col-sm-12"&gt;{"\n"}{"        "}&lt;label for="input-disabled" class="form-label"&gt;Type Disabled&lt;/label&gt;{"\n"}{"        "}&lt;input type="text" id="input-disabled" class="form-control" placeholder="Disabled input" disabled&gt;{"\n"}{"    "}&lt;/div&gt;{"\n"}{"    "}&lt;div class="col-xl-4 col-lg-6 col-md-6 col-sm-12"&gt;{"\n"}{"        "}&lt;label for="input-readonlytext" class="form-label"&gt;Input Readonly Text&lt;/label&gt;{"\n"}{"        "}&lt;input type="text" readonly class="form-control-plaintext" id="input-readonlytext" value="email@example.com"&gt;{"\n"}{"    "}&lt;/div&gt;{"\n"}{"    "}&lt;div class="col-xl-4 col-lg-6 col-md-6 col-sm-12"&gt;{"\n"}{"        "}&lt;label for="disabled-readonlytext" class="form-label"&gt;Disabled Readonly Input&lt;/label&gt;{"\n"}{"        "}&lt;input class="form-control" type="text" value="Disabled readonly input" id="disabled-readonlytext" aria-label="Disabled input example" disabled readonly&gt;{"\n"}{"    "}&lt;/div&gt;{"\n"}{"    "}&lt;div class="col-xl-4 col-lg-6 col-md-6 col-sm-12"&gt;{"\n"}{"        "}&lt;label class="form-label"&gt;Type Readonly Input&lt;/label&gt;{"\n"}{"        "}&lt;input class="form-control" type="text" value="Readonly input here..." aria-label="readonly input example" readonly&gt;{"\n"}{"    "}&lt;/div&gt;{"\n"}{"    "}&lt;div class="col-xl-4 col-lg-6 col-md-6 col-sm-12"&gt;{"\n"}{"        "}&lt;label for="text-area" class="form-label"&gt;Textarea&lt;/label&gt;{"\n"}{"        "}&lt;textarea class="form-control" id="text-area" rows="1"&gt;&lt;/textarea&gt;{"\n"}{"    "}&lt;/div&gt;{"\n"}{"    "}&lt;div class="col-xl-4 col-lg-6 col-md-6 col-sm-12"&gt;{"\n"}{"        "}&lt;label for="input-DataList" class="form-label"&gt;Datalist example&lt;/label&gt;{"\n"}{"        "}&lt;input class="form-control" list="datalistOptions" id="input-DataList" placeholder="Type to search..."&gt;{"\n"}{"        "}&lt;datalist id="datalistOptions"&gt;{"\n"}{"            "}&lt;option value="San Francisco"&gt;{"\n"}{"            "}&lt;/option&gt;{"\n"}{"            "}&lt;option value="New York"&gt;{"\n"}{"            "}&lt;/option&gt;{"\n"}{"            "}&lt;option value="Seattle"&gt;{"\n"}{"            "}&lt;/option&gt;{"\n"}{"            "}&lt;option value="Los Angeles"&gt;{"\n"}{"            "}&lt;/option&gt;{"\n"}{"            "}&lt;option value="Chicago"&gt;{"\n"}{"            "}&lt;/option&gt;{"\n"}{"        "}&lt;/datalist&gt;{"\n"}{"    "}&lt;/div&gt;{"\n"}&lt;/div&gt;</code></pre>
        {/* Prism Code */}
      </div>
    </div>
  </div>
</div>

    </>
  )
};  

export default App;
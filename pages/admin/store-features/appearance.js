const Appearance = () => {
  return (
    <>
      <div className="tabs_item">
        <div className="row">
          <div className="col-12">
            <h3>Theme</h3>
          </div>
          <div className="col-12">
            <div className="form-wrap-admin">
              <form>
                <div class="form-group row">
                  <label for="staticEmail" class="col-sm-2 col-form-label">Select a theme</label>
                  <div class="col-sm-10">
                    <select class="form-control">
                      <option> Theme 1 </option>
                      <option> Theme 2 </option>
                      <option> Theme 3 </option>
                    </select>
                  </div>
                </div>

                <div class="form-group row">
                  <label for="staticEmail" class="col-sm-2 col-form-label">Font family</label>
                  <div class="col-sm-10">
                    <input class="form-control" type="text" />
                  </div>
                </div>

                
              </form>
            </div>
          </div>
        </div>


        <div className="row mt-5">
          <div className="col-12">
            <h3>Features</h3>
          </div>
          <div className="col-12">
            <div className="form-wrap-admin">
              <form>
                <div class="form-group row">
                  <label for="inputPassword" class="col-sm-2 col-form-label">Newsletter subscription</label>
                  <div class="col-sm-10">
                    <label className="switch">
                      <input type="checkbox" />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </div>

                <div class="form-group row">
                  <label for="inputPassword" class="col-sm-2 col-form-label">Home page slider</label>
                  <div class="col-sm-10">
                    <label className="switch">
                      <input type="checkbox" />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </div>

                <div class="form-group row">
                  <label for="inputPassword" class="col-sm-2 col-form-label">Home page categories</label>
                  <div class="col-sm-10">
                    <label className="switch">
                      <input type="checkbox" />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </div>

                <div class="form-group row">
                  <label for="inputPassword" class="col-sm-2 col-form-label">Home page drops</label>
                  <div class="col-sm-10">
                    <label className="switch">
                      <input type="checkbox" />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </div>

                <div class="form-group row">
                  <label for="inputPassword" class="col-sm-2 col-form-label">Home page slider</label>
                  <div class="col-sm-10">
                    <label className="switch">
                      <input type="checkbox" />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </div>

              </form>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default Appearance;

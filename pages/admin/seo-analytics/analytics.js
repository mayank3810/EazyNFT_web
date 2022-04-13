const Analytics = () => {
  return (
    <>
      <div className="tabs_item">
        <div className="row">
          <div className="col-12">
            <h3>Google</h3>
          </div>
          <div className="col-12">
            <div className="form-wrap-admin">
              <form>
                <div class="form-group row">
                  <label for="staticEmail" class="col-sm-2 col-form-label">GTM Container Id</label>
                  <div class="col-sm-10">
                    <input class="form-control" type="text" />
                  </div>
                </div>

                <div class="form-group row">
                  <label for="staticEmail" class="col-sm-2 col-form-label">Google Analytics Id</label>
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
            <h3>Scripts</h3>
          </div>
          <div className="col-12">
            <div className="form-wrap-admin">
              <form>
                <div class="form-group row">
                  <label for="staticEmail" class="col-sm-2 col-form-label">Header Scripts</label>
                  <div class="col-sm-10">
                    <textarea class="form-control" type="text" />
                  </div>
                </div>

                <div class="form-group row">
                  <label for="staticEmail" class="col-sm-2 col-form-label">Footer Scripts</label>
                  <div class="col-sm-10">
                    <textarea class="form-control" type="text" />
                  </div>
                </div>

                <div class="form-group ">
                  <button className="btn default-btn float-end"> Save</button>
                </div>

              </form>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default Analytics;

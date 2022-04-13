const Advanced = () => {
  return (
    <>
      <div className="tabs_item">
        <div className="row">
          <div className="col-12">
            <h3>Store</h3>
          </div>
          <div className="col-12">
            <div className="form-wrap-admin">
              <form>
                <div class="form-group row">
                  <label for="staticEmail" class="col-sm-2 col-form-label">Site URL</label>
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
            <h3>Networks</h3>
          </div>
          <div className="col-12">
            <div className="form-wrap-admin">
              <form>
                <div class="form-group row">
                  <label for="inputPassword" class="col-sm-2 col-form-label">Ethereum (Mainnet)</label>
                  <div class="col-sm-10">
                    <label className="switch">
                      <input type="checkbox" />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </div>

                <div class="form-group row">
                  <label for="inputPassword" class="col-sm-2 col-form-label">Polygon (Mainnet)</label>
                  <div class="col-sm-10">
                    <label className="switch">
                      <input type="checkbox" />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </div>

                <div class="form-group row">
                  <label for="inputPassword" class="col-sm-2 col-form-label">Binance Smart Chain (Mainnet)</label>
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


        <div className="row mt-5">
          <div className="col-12">
            <h3>Others</h3>
          </div>
          <div className="col-12">
            <div className="form-wrap-admin">
              <form>
              <div class="form-group row">
                  <label for="inputPassword" class="col-sm-2 col-form-label">Enable Bidding</label>
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

export default Advanced;

const PrivacyPolicy = () => {
  return (
    <>
      <div className="tabs_item">
        <div className="row">
          <div className="col-12">
            <h3>Privacy Policy</h3>
          </div>
          <div className="col-12">
            <div className="form-wrap-admin">
              <form>
                <div class="form-group row">
                  <label for="staticEmail" class="col-sm-2 col-form-label">Header</label>
                  <div class="col-sm-10">
                    <input class="form-control" type="text" />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="staticEmail" class="col-sm-2 col-form-label">Featured Image</label>
                  <div class="col-sm-10">
                    <input class="form-control" type="text" />
                  </div>
                </div>

                <div class="form-group row">
                  <label for="staticEmail" class="col-sm-2 col-form-label">Content</label>
                  <div class="col-sm-10">
                    <textarea class="form-control" rows={25} type="text" />
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

export default PrivacyPolicy;

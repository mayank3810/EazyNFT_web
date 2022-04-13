const Seo = () => {
  return (
    <>
      <div className="tabs_item">
        <div className="row">
          <div className="col-12">
            <h3>SEO</h3>
          </div>
          <div className="col-12">
            <div className="form-wrap-admin">
              <form>
                <div class="form-group row">
                  <label for="staticEmail" class="col-sm-2 col-form-label">Meta Title</label>
                  <div class="col-sm-10">
                    <input class="form-control" type="text" />
                  </div>
                </div>

                <div class="form-group row">
                  <label for="staticEmail" class="col-sm-2 col-form-label">Meta Keyword</label>
                  <div class="col-sm-10">
                    <input class="form-control" type="text" />
                  </div>
                </div>

                <div class="form-group row">
                  <label for="staticEmail" class="col-sm-2 col-form-label">Meta Description</label>
                  <div class="col-sm-10">
                    <textarea class="form-control" type="text" />
                  </div>
                </div>

                <div class="form-group row">
                  <label for="staticEmail" class="col-sm-2 col-form-label">Meta Tags</label>
                  <div class="col-sm-10">
                    <textarea class="form-control" type="text" />
                  </div>
                </div>

                <div class="form-group row">
                  <label for="staticEmail" class="col-sm-2 col-form-label">Robots.txt</label>
                  <div class="col-sm-10">
                    <textarea class="form-control" type="text" />
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
                  <label for="staticEmail" class="col-sm-2 col-form-label">Favicon</label>
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Seo;

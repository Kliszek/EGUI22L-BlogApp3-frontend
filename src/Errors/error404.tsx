import { Link } from "react-router-dom";

export const Error404 = () => {
  return (
    <div className="row justify-content-center vh-100 align-items-center">
      <div className="col-10 col-md-8 col-lg-6 col-xl-5 card ">
        <div className="card-body p-3 m-3 text-start">
          <div className="mb-3 border-1 border-bottom">
            <h3 className="h3 pb-2 text-start fw-semibold">Error 404!</h3>
            <p className="small text-start">Sorry, this page could not be found!</p>
          </div>
          <Link className="d-block mt-3 pt-2 lead fw-semibold" to='/blogs'>That's not a problem, you can always go back!</Link>
        </div>
      </div>
    </div>
  );
};
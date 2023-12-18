export function Boxhtml(props: any) {
    return (<div className="container addScrollpatient" style={{ marginTop: '13px', marginBottom: '13px' }}>
        <div className="container-fluid p-0">
            <div className="main-container">
                <div className="content-wrapper ">
                    <div className="row gutters">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-10">
                            <div className="mincon">
                                <div className="card-body">
                                    {props.children}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Row end --> */}

                </div>
                {/* <!-- Content wrapper end --> */}

            </div>
            {/* <!-- *************
    ************ Main container end *************
************* --> */}
            {/* <footer className="main-footer">© Footer</footer> */}
        </div>
        {/* <Notifications position='bottom-right' /> */}

    </div>);
}
export function SmallInputdesign(props: any) {
    return (
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
            <div className="form-group acenter">
                {props.children}
            </div>
        </div>
    )

}

export function BigInputdesign(props: any) {
    return (
        <div className="col-sm-12">
            <div className="form-group">
                {props.children}
            </div>
        </div>
    )

}
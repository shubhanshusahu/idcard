export function Boxhtml(props: any) {
    return (<div className="container addScrollpatient" style={{ marginTop: '13px', marginBottom: '13px' }}>
        <div className="container-fluid p-0">
            <div className="main-container">
                <div className="content-wrapper ">
                    <div className="row gutters">
                        <div className="col-12">
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
        <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 align-self-*-center">
            <div className="form-group acenter ">
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
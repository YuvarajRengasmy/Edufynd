import React from "react";
import Header from '../../compoents/header';
import Sidebar from '../../compoents/sidebar';

const Home = () => {
  return (
    <div>
      <div class="position-fixed">
        <div class="fixed-element">
          <Header />
          <Sidebar />
        </div>
      </div>
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Dashboard</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-3 col-6">
                <div className="small-box bg-info">
                  <div className="inner">
                    <h3>150</h3>
                    <p>New Products</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-bag" />
                  </div>
                  <a href="#" className="small-box-footer">
                    More info <i className="fas fa-arrow-circle-right" />
                  </a>
                </div>
              </div>
              <div className="col-lg-3 col-6">
                <div className="small-box bg-success">
                  <div className="inner">
                    <h3>
                      53<sup style={{ fontSize: 20 }}>%</sup>
                    </h3>
                    <p>Hot selling Products</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-stats-bars" />
                  </div>
                  <a href="#" className="small-box-footer">
                    More info <i className="fas fa-arrow-circle-right" />
                  </a>
                </div>
              </div>
              <div className="col-lg-3 col-6">
                <div className="small-box bg-warning">
                  <div className="inner">
                    <h3>44</h3>
                    <p>Tracking Order</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-person-add" />
                  </div>
                  <a href="#" className="small-box-footer">
                    More info <i className="fas fa-arrow-circle-right" />
                  </a>
                </div>
              </div>
              <div className="col-lg-3 col-6">
                <div className="small-box bg-danger">
                  <div className="inner">
                    <h3>65</h3>
                    <p>Visitors</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-pie-graph" />
                  </div>
                  <a href="#" className="small-box-footer">
                    More info <i className="fas fa-arrow-circle-right" />
                  </a>
                </div>
              </div>
            </div>
            <div className="row">
              <section className="col-lg-7 connectedSortable">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">
                      <i className="fas fa-chart-pie mr-1" />
                      Sales
                    </h3>
                    <div className="card-tools">
                      <ul className="nav nav-pills ml-auto">
                        <li className="nav-item">
                          <a
                            className="nav-link active"
                            href="#revenue-chart"
                            data-toggle="tab"
                          >
                            Area
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            href="#sales-chart"
                            data-toggle="tab"
                          >
                            Donut
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="tab-content p-0">
                      <div
                        className="chart tab-pane active"
                        id="revenue-chart"
                        style={{ position: "relative", height: 300 }}
                      >
                        <canvas
                          id="revenue-chart-canvas"
                          height={300}
                          style={{ height: 300 }}
                        />
                      </div>
                      <div
                        className="chart tab-pane"
                        id="sales-chart"
                        style={{ position: "relative", height: 300 }}
                      >
                        <canvas
                          id="sales-chart-canvas"
                          height={300}
                          style={{ height: 300 }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">
                      <i className="ion ion-clipboard mr-1" />
                      To Do List
                    </h3>
                    <div className="card-tools">
                      <ul className="pagination pagination-sm">
                        <li className="page-item">
                          <a href="#" className="page-link">
                            «
                          </a>
                        </li>
                        <li className="page-item">
                          <a href="#" className="page-link">
                            1
                          </a>
                        </li>
                        <li className="page-item">
                          <a href="#" className="page-link">
                            2
                          </a>
                        </li>
                        <li className="page-item">
                          <a href="#" className="page-link">
                            3
                          </a>
                        </li>
                        <li className="page-item">
                          <a href="#" className="page-link">
                            »
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="card-body">
                    <ul className="todo-list" data-widget="todo-list">
                      <li>
                        <span className="handle">
                          <i className="fas fa-ellipsis-v" />
                          <i className="fas fa-ellipsis-v" />
                        </span>
                        <div className="icheck-primary d-inline ml-2">
                          <input
                            type="checkbox"
                            defaultValue
                            name="todo1"
                            id="todoCheck1"
                          />
                          <label htmlFor="todoCheck1" />
                        </div>
                        <span className="text">Design a nice theme</span>
                        <small className="badge badge-danger">
                          <i className="far fa-clock" /> 2 mins
                        </small>
                        <div className="tools">
                          <i className="fas fa-edit" />
                          <i className="fas fa-trash-o" />
                        </div>
                      </li>
                      <li>
                        <span className="handle">
                          <i className="fas fa-ellipsis-v" />
                          <i className="fas fa-ellipsis-v" />
                        </span>
                        <div className="icheck-primary d-inline ml-2">
                          <input
                            type="checkbox"
                            defaultValue
                            name="todo2"
                            id="todoCheck2"
                            defaultChecked
                          />
                          <label htmlFor="todoCheck2" />
                        </div>
                        <span className="text">Make the theme responsive</span>
                        <small className="badge badge-info">
                          <i className="far fa-clock" /> 4 hours
                        </small>
                        <div className="tools">
                          <i className="fas fa-edit" />
                          <i className="fas fa-trash-o" />
                        </div>
                      </li>
                      <li>
                        <span className="handle">
                          <i className="fas fa-ellipsis-v" />
                          <i className="fas fa-ellipsis-v" />
                        </span>
                        <div className="icheck-primary d-inline ml-2">
                          <input
                            type="checkbox"
                            defaultValue
                            name="todo3"
                            id="todoCheck3"
                          />
                          <label htmlFor="todoCheck3" />
                        </div>
                        <span className="text">
                          Let theme shine like a star
                        </span>
                        <small className="badge badge-warning">
                          <i className="far fa-clock" /> 1 day
                        </small>
                        <div className="tools">
                          <i className="fas fa-edit" />
                          <i className="fas fa-trash-o" />
                        </div>
                      </li>
                      <li>
                        <span className="handle">
                          <i className="fas fa-ellipsis-v" />
                          <i className="fas fa-ellipsis-v" />
                        </span>
                        <div className="icheck-primary d-inline ml-2">
                          <input
                            type="checkbox"
                            defaultValue
                            name="todo4"
                            id="todoCheck4"
                          />
                          <label htmlFor="todoCheck4" />
                        </div>
                        <span className="text">
                          Let theme shine like a star
                        </span>
                        <small className="badge badge-success">
                          <i className="far fa-clock" /> 3 days
                        </small>
                        <div className="tools">
                          <i className="fas fa-edit" />
                          <i className="fas fa-trash-o" />
                        </div>
                      </li>
                      <li>
                        <span className="handle">
                          <i className="fas fa-ellipsis-v" />
                          <i className="fas fa-ellipsis-v" />
                        </span>
                        <div className="icheck-primary d-inline ml-2">
                          <input
                            type="checkbox"
                            defaultValue
                            name="todo5"
                            id="todoCheck5"
                          />
                          <label htmlFor="todoCheck5" />
                        </div>
                        <span className="text">
                          Check your messages and notifications
                        </span>
                        <small className="badge badge-primary">
                          <i className="far fa-clock" /> 1 week
                        </small>
                        <div className="tools">
                          <i className="fas fa-edit" />
                          <i className="fas fa-trash-o" />
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="card-footer clearfix">
                    <button
                      type="button"
                      className="btn btn-primary float-right"
                    >
                      <i className="fas fa-plus" /> Add item
                    </button>
                  </div>
                </div>
              </section>
              <section className="col-lg-5 connectedSortable">
                <div className="card bg-gradient-primary">
                  <div className="card-header border-0">
                    <h3 className="card-title">
                      <i className="fas fa-map-marker-alt mr-1" />
                      Visitors
                    </h3>
                    <div className="card-tools">
                      <button
                        type="button"
                        className="btn btn-primary btn-sm daterange"
                        data-toggle="tooltip"
                        title="Date range"
                      >
                        <i className="far fa-calendar-alt" />
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        data-card-widget="collapse"
                        data-toggle="tooltip"
                        title="Collapse"
                      >
                        <i className="fas fa-minus" />
                      </button>
                    </div>
                  </div>
                  <div className="card-body">
                    <div
                      id="world-map"
                      style={{ height: 250, width: "100%" }}
                    />
                  </div>
                  <div className="card-footer bg-transparent">
                    <div className="row">
                      <div className="col-4 text-center">
                        <div id="sparkline-1" />
                        <div className="text-white">Visitors</div>
                      </div>
                      <div className="col-4 text-center">
                        <div id="sparkline-2" />
                        <div className="text-white">Online</div>
                      </div>
                      <div className="col-4 text-center">
                        <div id="sparkline-3" />
                        <div className="text-white">Sales</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card bg-gradient-info">
                  <div className="card-header border-0">
                    <h3 className="card-title">
                      <i className="fas fa-th mr-1" />
                      Sales Graph
                    </h3>
                    <div className="card-tools">
                      <button
                        type="button"
                        className="btn bg-info btn-sm"
                        data-card-widget="collapse"
                      >
                        <i className="fas fa-minus" />
                      </button>
                      <button
                        type="button"
                        className="btn bg-info btn-sm"
                        data-card-widget="remove"
                      >
                        <i className="fas fa-times" />
                      </button>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="chartjs-size-monitor">
                      <div className="chartjs-size-monitor-expand">
                        <div className />
                      </div>
                      <div className="chartjs-size-monitor-shrink">
                        <div className />
                      </div>
                    </div>
                    <div className="chart">
                      <canvas
                        id="sales-chart-canvas"
                        height={180}
                        style={{ height: 180 }}
                        className="chartjs-render-monitor"
                      />
                    </div>
                  </div>
                  <div className="card-footer bg-transparent">
                    <div className="row">
                      <div className="col-4 text-center">
                        <input
                          type="text"
                          className="knob"
                          data-readonly="true"
                          defaultValue={20}
                          data-width={60}
                          data-height={60}
                          data-fgColor="#39CCCC"
                        />
                        <div className="text-white">Mail-Orders</div>
                      </div>
                      <div className="col-4 text-center">
                        <input
                          type="text"
                          className="knob"
                          data-readonly="true"
                          defaultValue={50}
                          data-width={60}
                          data-height={60}
                          data-fgColor="#39CCCC"
                        />
                        <div className="text-white">Online</div>
                      </div>
                      <div className="col-4 text-center">
                        <input
                          type="text"
                          className="knob"
                          data-readonly="true"
                          defaultValue={30}
                          data-width={60}
                          data-height={60}
                          data-fgColor="#39CCCC"
                        />
                        <div className="text-white">In-Store</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card bg-gradient-success">
                  <div className="card-header border-0">
                    <h3 className="card-title">
                      <i className="fas fa-th mr-1" />
                      Sales Graph
                    </h3>
                    <div className="card-tools">
                      <button
                        type="button"
                        className="btn bg-success btn-sm"
                        data-card-widget="collapse"
                      >
                        <i className="fas fa-minus" />
                      </button>
                      <button
                        type="button"
                        className="btn bg-success btn-sm"
                        data-card-widget="remove"
                      >
                        <i className="fas fa-times" />
                      </button>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="chartjs-size-monitor">
                      <div className="chartjs-size-monitor-expand">
                        <div className />
                      </div>
                      <div className="chartjs-size-monitor-shrink">
                        <div className />
                      </div>
                    </div>
                    <div className="chart">
                      <canvas
                        id="line-chart"
                        style={{
                          minHeight: 250,
                          height: 250,
                          maxHeight: 250,
                          maxWidth: "100%",
                          width: "100%",
                        }}
                        className="chartjs-render-monitor"
                      />
                    </div>
                  </div>
                  <div className="card-footer bg-transparent">
                    <div className="row">
                      <div className="col-4 text-center">
                        <input
                          type="text"
                          className="knob"
                          data-readonly="true"
                          defaultValue={20}
                          data-width={60}
                          data-height={60}
                          data-fgColor="#f56954"
                        />
                        <div className="text-white">Mail-Orders</div>
                      </div>
                      <div className="col-4 text-center">
                        <input
                          type="text"
                          className="knob"
                          data-readonly="true"
                          defaultValue={50}
                          data-width={60}
                          data-height={60}
                          data-fgColor="#f56954"
                        />
                        <div className="text-white">Online</div>
                      </div>
                      <div className="col-4 text-center">
                        <input
                          type="text"
                          className="knob"
                          data-readonly="true"
                          defaultValue={30}
                          data-width={60}
                          data-height={60}
                          data-fgColor="#f56954"
                        />
                        <div className="text-white">In-Store</div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
export default Home;

import React from 'react';
import SmallBox from '../components/layout/SmallBox';

const Dashboard: React.FC = () => {
  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Dashboard</h1>
            </div>
          </div>
        </div>
      </div>

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 col-6">
              <SmallBox
                bgColor="bg-info"
                title="New Orders"
                value={150}
                icon="ion-bag"
              />
            </div>
            <div className="col-lg-3 col-6">
              <SmallBox
                bgColor="bg-success"
                title="Bounce Rate"
                value="53%"
                icon="ion-stats-bars"
              />
            </div>
            <div className="col-lg-3 col-6">
              <SmallBox
                bgColor="bg-warning"
                title="User Registrations"
                value={44}
                icon="ion-person-add"
              />
            </div>
            <div className="col-lg-3 col-6">
              <SmallBox
                bgColor="bg-danger"
                title="Unique Visitors"
                value={65}
                icon="ion-pie-graph"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
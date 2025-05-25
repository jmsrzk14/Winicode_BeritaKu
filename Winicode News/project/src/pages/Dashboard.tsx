import React from 'react';
import SmallBox from '../components/layout/SmallBox';
import { Newspaper, Layers, BarChart } from 'lucide-react';
import { NewsDetail } from '../components/NewDetail';

const Dashboard: React.FC = () => {
  return (
    <div className="content-wrapper bg-gray-50 min-h-screen py-6">
      <section className="content">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <SmallBox
              icon={<Layers className="text-white text-xl" />}
              title="Category"
              value="3,200"
              iconBgColor="bg-cyan-500"
            />
            <SmallBox
              icon={<Newspaper className="text-white text-xl" />}
              title="News"
              value="$230,220"
              iconBgColor="bg-green-500"
            />
            <SmallBox
              icon={<BarChart className="text-white text-xl" />}
              title="Avg Revenue"
              value="$2,300"
              iconBgColor="bg-rose-500"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;

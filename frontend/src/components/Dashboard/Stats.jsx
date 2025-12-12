import React from 'react';
import { CheckCircle, Clock, AlertCircle, List } from 'lucide-react';

const StatsCard = ({ title, count, icon: Icon, color }) => (
    <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-5">
            <div className="flex items-center">
                <div className={`flex-shrink-0 p-3 rounded-md ${color}`}>
                    <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                    <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
                        <dd className="text-3xl font-semibold text-gray-900">{count}</dd>
                    </dl>
                </div>
            </div>
        </div>
    </div>
);

const Stats = ({ stats }) => {
    if (!stats) return null;

    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <StatsCard
                title="Total Tasks"
                count={stats.total}
                icon={List}
                color="bg-indigo-500"
            />
            <StatsCard
                title="Pending"
                count={stats.pending}
                icon={Clock}
                color="bg-yellow-500"
            />
            <StatsCard
                title="In Progress"
                count={stats.in_progress}
                icon={AlertCircle}
                color="bg-blue-500"
            />
            <StatsCard
                title="Completed"
                count={stats.completed}
                icon={CheckCircle}
                color="bg-green-500"
            />
        </div>
    );
};

export default Stats;

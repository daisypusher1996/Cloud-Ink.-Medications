import React from 'react';
import { Package, AlertTriangle, CheckCircle, Clock, Truck, Database, Tag } from 'lucide-react';
import { Medication, PurchaseOrderWithDetails } from '../types';

interface OrdersTableProps {
  orders: PurchaseOrderWithDetails[];
}

export const RecentOrdersTable: React.FC<OrdersTableProps> = ({ orders }) => {
  const getStatusBadge = (status: string) => {
    switch(status.toLowerCase()) {
      case 'received':
      case 'delivered':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />{status}</span>;
      case 'pending':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />{status}</span>;
      case 'shipped':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"><Truck className="w-3 h-3 mr-1" />{status}</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col h-full mt-4">
      <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center">
            <Package className="h-5 w-5 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold text-slate-900">Purchase Orders Registry</h3>
        </div>
        <span className="text-sm text-slate-500">{orders.length} Records</span>
      </div>
      <div className="overflow-x-auto flex-grow">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Order ID</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Medication</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Supplier</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Qty</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {orders.length === 0 ? (
                <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-sm text-slate-500">No recent orders found.</td>
                </tr>
            ) : (
                orders.map((order) => (
                <tr key={order.purchase_order_id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">#{order.purchase_order_id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{order.medication_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{order.supplier}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{order.quantity_ordered}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{new Date(order.order_date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(order.status)}</td>
                </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const InventoryTable: React.FC<{ items: Medication[] }> = ({ items }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col mt-4">
      <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center">
            <Database className="h-5 w-5 text-indigo-600 mr-2" />
            <h3 className="text-lg font-semibold text-slate-900">Master Medication Database</h3>
        </div>
        <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">{items.length} records</span>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Medication Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Generic Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Dosage / Form</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Manufacturer</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Batch #</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Price</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Stock</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {items.length === 0 ? (
                <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-sm text-slate-500">No inventory data available.</td>
                </tr>
            ) : (
                items.map((item) => (
                <tr key={item.medication_id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-slate-900">{item.medication_name}</div>
                        <div className="text-xs text-slate-400">{item.description.substring(0, 30)}...</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{item.generic_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-800">
                            {item.dosage} • {item.formulation}
                        </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 flex items-center">
                        <Tag className="w-3 h-3 mr-1 text-slate-400" />
                        {item.manufacturer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-slate-500">{item.batch_number}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">₱{item.priceperunit.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <span className={`${item.quantity_in_stock <= item.reorder_level ? 'text-red-600' : 'text-green-600'}`}>
                            {item.quantity_in_stock}
                        </span>
                    </td>
                </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
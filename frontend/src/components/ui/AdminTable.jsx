import { MoreHorizontal, Edit, Trash2 } from 'lucide-react';

export const AdminTable = ({ columns, data, onEdit, onDelete }) => {
  return (
    <div className="w-full bg-surface/50 border border-textPrimary/10 backdrop-blur-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-textPrimary/10 bg-surface/80">
              {columns.map((col, i) => (
                <th key={i} className="py-4 px-6 text-xs uppercase tracking-widest text-textSecondary font-medium">
                  {col.header}
                </th>
              ))}
              <th className="py-4 px-6 text-xs uppercase tracking-widest text-textSecondary font-medium text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="py-8 text-center text-sm text-textSecondary">
                  No records found.
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-b border-textPrimary/5 hover:bg-surface/80 transition-colors group">
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className="py-4 px-6 text-sm">
                      {col.render ? col.render(row) : row[col.accessor]}
                    </td>
                  ))}
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      {onEdit && (
                        <button onClick={() => onEdit(row)} className="text-textSecondary hover:text-textPrimary transition-colors">
                          <Edit size={16} />
                        </button>
                      )}
                      {onDelete && (
                        <button onClick={() => onDelete(row)} className="text-red-500/70 hover:text-red-500 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
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

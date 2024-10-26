import React from 'react';

const MainLayout: React.FC = ({ children }: any) => {
    return (
        <div>
            {/* Nội dung của layout chính */}
            {children}
        </div>
    );
};

export default MainLayout;
export { }; // Để tránh lỗi --isolatedModules

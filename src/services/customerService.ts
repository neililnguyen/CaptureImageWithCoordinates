export const fetchCustomerData = async (id: string) => {
    // Giả sử đây là dịch vụ API gọi dữ liệu khách hàng
    const response = await fetch(`/api/customers/${id}`);
    return await response.json();
};

export { }; // Để tránh lỗi --isolatedModules

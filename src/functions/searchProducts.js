

export const searchProducts = (name = '',datas , column='') => {
    
    if (name.trim().length === 0 || column === '') return datas;

    return datas.filter(data => data[column].toString().toLowerCase().includes(name))
    
}

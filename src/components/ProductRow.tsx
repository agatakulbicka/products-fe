const ProductRow = ({ id, number, name }) => {
  return <div className="px-6 py-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex flex-col ">
                      <h4 className="text-sm font-medium text-gray-900">{name}</h4>
                      {number && (
                        <p className=" px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 w-fit mt-1">
                          Number: {number}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
};

export default ProductRow;
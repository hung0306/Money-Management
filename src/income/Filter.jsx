import "aos/dist/aos.css";
import { useBootstrapTooltips } from "../functions/Tooltip";

const Filters = ({
  searchTerm,
  setSearchTerm,
  filterType,
  setFilterType,
  filterCategory,
  setFilterCategory,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  filterOptions,
}) => {
  useBootstrapTooltips();

  return (
    <div
      id="filters-section"
      className="row mb-4"
      data-aos="fade-up"
      data-aos-delay="300"
    >
      <div className="col-12">
        <div className="card border-0 shadow rounded-3">
          <div className="card-body">
            <div className="row g-3 align-items-end">
              <div className="col-md-3">
                <label className="form-label fw-semibold">
                  <i className="bx bx-search me-1 text-primary"></i>Tìm kiếm
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tìm kiếm giao dịch..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  data-aos="fade-up"
                  data-aos-delay="400"
                />
              </div>
              <div className="col-md-2">
                <label className="form-label fw-semibold">
                  <i className="bx bx-filter me-1 text-primary"></i>Loại
                </label>
                <select
                  className="form-select"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  data-aos="fade-up"
                  data-aos-delay="450"
                >
                  {filterOptions.types.map((option) => (
                    <option key={option.value} value={option.value}>
                      <i className={`bx ${option.icon} me-1`}></i>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-2">
                <label className="form-label fw-semibold">
                  <i className="bx bx-category me-1 text-primary"></i>Danh mục
                </label>
                <select
                  className="form-select"
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  data-aos="fade-up"
                  data-aos-delay="500"
                >
                  {filterOptions.categories.map((option) => (
                    <option key={option.value} value={option.value}>
                      <i className={`bx ${option.icon} me-1`}></i>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-2">
                <label className="form-label fw-semibold">
                  <i className="bx bx-sort me-1 text-primary"></i>Sắp xếp theo
                </label>
                <select
                  className="form-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  data-aos="fade-up"
                  data-aos-delay="550"
                >
                  {filterOptions.sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      <i className={`bx ${option.icon} me-1`}></i>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-2">
                <label className="form-label fw-semibold">
                  <i className="bx bx-sort-alt-2 me-1 text-primary"></i>Thứ tự
                </label>
                <select
                  className="form-select"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  data-aos="fade-up"
                  data-aos-delay="600"
                >
                  <option value="desc">Giảm dần</option>
                  <option value="asc">Tăng dần</option>
                </select>
              </div>
              <div className="col-md-1">
                <button
                  className="btn btn-outline-primary w-100"
                  onClick={() => {
                    setSearchTerm("");
                    setFilterType("all");
                    setFilterCategory("all");
                    setSortBy("date");
                    setSortOrder("desc");
                  }}
                  data-bs-toggle="tooltip"
                  title="Xóa tất cả bộ lọc"
                  data-aos="fade-up"
                  data-aos-delay="650"
                >
                  <i className="bx bx-refresh"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;

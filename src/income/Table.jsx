import { useEffect, useState } from "react";
import Summary from "./Summary";
import Filters from "./Filter";
import TransactionTable from "./TransactionTable";

const Table = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const loadTransactions = () => {
      try {
        const storedTransactions = localStorage.getItem("transactions");
        if (storedTransactions) {
          const parsed = JSON.parse(storedTransactions);
          const validTransactions = parsed.filter(
            (t) => t.id && t.date && !isNaN(new Date(t.date).getTime())
          );
          setTransactions(validTransactions);
          setFilteredTransactions(validTransactions);
        }
      } catch (error) {
        console.error("Error loading transactions from localStorage:", error);
      }
    };

    loadTransactions();
    window.addEventListener("storage", loadTransactions);
    window.addEventListener("transactionsUpdated", loadTransactions);
    return () => {
      window.removeEventListener("storage", loadTransactions);
      window.removeEventListener("transactionsUpdated", loadTransactions);
    };
  }, []);

  useEffect(() => {
    let filtered = transactions.filter((transaction) => {
      if (!transaction) return false;
      const matchesSearch =
        (transaction.description?.toLowerCase() || "").includes(
          searchTerm.toLowerCase()
        ) ||
        (transaction.paymentMethod?.toLowerCase() || "").includes(
          searchTerm.toLowerCase()
        );
      const matchesType =
        filterType === "all" || transaction.type === filterType;
      const matchesCategory =
        filterCategory === "all" || transaction.category === filterCategory;

      return matchesSearch && matchesType && matchesCategory;
    });

    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (sortBy === "amount") {
        aValue = parseFloat(aValue) || 0;
        bValue = parseFloat(bValue) || 0;
      } else if (sortBy === "date") {
        aValue = new Date(aValue) || new Date(0);
        bValue = new Date(bValue) || new Date(0);
      } else if (sortBy === "description") {
        aValue = (aValue || "").toLowerCase();
        bValue = (bValue || "").toLowerCase();
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredTransactions(filtered);
    setCurrentPage(1);
  }, [transactions, searchTerm, filterType, filterCategory, sortBy, sortOrder]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = filteredTransactions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  const handleTransactionAdded = (newTransaction) => {
    try {
      setTransactions((prev) => {
        const updated = [...prev, newTransaction];
        try {
          localStorage.setItem("transactions", JSON.stringify(updated));
        } catch {}
        return updated;
      });
    } catch {}
  };

  const filterOptions = {
    types: [
      { value: "all", label: "Tất cả loại", icon: "bx-list-ul" },
      { value: "income", label: "Thu nhập", icon: "bx-trending-up" },
      { value: "expense", label: "Chi tiêu", icon: "bx-trending-down" },
    ],
    categories: [
      { value: "all", label: "Tất cả danh mục", icon: "bx-category" },
      { value: "salary", label: "Lương", icon: "bx-briefcase" },
      { value: "freelance", label: "Freelance", icon: "bx-laptop" },
      { value: "investment", label: "Đầu tư", icon: "bx-line-chart" },
      { value: "food", label: "Ăn uống", icon: "bx-restaurant" },
      { value: "bills", label: "Hóa đơn & tiện ích", icon: "bx-home" },
      { value: "transport", label: "Di chuyển", icon: "bx-car" },
      { value: "shopping", label: "Mua sắm", icon: "bx-cart" },
      { value: "entertainment", label: "Giải trí", icon: "bx-movie" },
      { value: "healthcare", label: "Y tế", icon: "bx-plus-medical" },
      { value: "education", label: "Giáo dục", icon: "bx-book" },
      { value: "other", label: "Khác", icon: "bx-dots-horizontal-rounded" },
    ],
    sortOptions: [
      { value: "date", label: "Ngày", icon: "bx-calendar" },
      { value: "amount", label: "Số tiền", icon: "bx-dollar" },
      { value: "description", label: "Mô tả", icon: "bx-text" },
    ],
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount || 0);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return dateString && !isNaN(date)
      ? date.toLocaleDateString("id-ID", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "Không có";
  };

  const getTypeColor = (type) => {
    return type === "income" ? "success" : "danger";
  };

  const getStatusColor = (status) => {
    return status === "completed" ? "success" : "warning";
  };

  const handleDelete = (id) => {
    const updatedTransactions = transactions.filter((t) => t.id !== id);
    try {
      localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
      setTransactions(updatedTransactions);
    } catch (error) {
      console.error("Error updating localStorage:", error);
    }
  };

  return (
    <section className="py-5 bg-white">
      <div className="container">
        <Summary
          filteredTransactions={filteredTransactions}
          formatCurrency={formatCurrency}
          onAddTransaction={handleTransactionAdded}
        />
        <Filters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterType={filterType}
          setFilterType={setFilterType}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          filterOptions={filterOptions}
        />
        <TransactionTable
          currentTransactions={currentTransactions}
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          indexOfFirstItem={indexOfFirstItem}
          indexOfLastItem={indexOfLastItem}
          filteredTransactions={filteredTransactions}
          formatCurrency={formatCurrency}
          formatDate={formatDate}
          getTypeColor={getTypeColor}
          getStatusColor={getStatusColor}
          handleDelete={handleDelete}
        />
      </div>
    </section>
  );
};

export default Table;

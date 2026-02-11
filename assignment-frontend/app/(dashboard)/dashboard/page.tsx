"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import { ApiResponse, Task, TaskFilters, TaskStatsType } from "../../../types";
import api from "../../../lib/api";
import { Button } from "../../../components/ui/Button";
import { Modal } from "../../../components/ui/Modal";
import { Toast } from "../../../components/ui/Toast";
import { TaskStats } from "../../../components/dashboard/TaskStats";
import { SearchFilter } from "../../../components/dashboard/SearchFilter";
import { TaskList } from "../../../components/dashboard/TaskList";
import { TaskForm } from "../../../components/dashboard/TaskForm";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [stats, setStats] = useState<TaskStatsType>({
    total: 0,
    pending: 0,
    "in-progress": 0,
    completed: 0,
  });
  const [filters, setFilters] = useState<TaskFilters>({
    sortBy: "createdAt",
    order: "desc",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  const fetchTasks = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (filters.status) params.append("status", filters.status);
      if (filters.priority) params.append("priority", filters.priority);
      if (filters.search) params.append("search", filters.search);
      if (filters.sortBy) params.append("sortBy", filters.sortBy);
      if (filters.order) params.append("order", filters.order);

      const response = await api.get<ApiResponse<{ tasks: Task[] }>>(
        `/tasks?${params.toString()}`,
      );

      if (response.data.success && response.data.data) {
        setTasks(response.data.data.tasks);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setToast({ message: "Failed to fetch tasks", type: "error" });
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  const fetchStats = useCallback(async () => {
    try {
      const response =
        await api.get<ApiResponse<{ stats: TaskStatsType }>>("/tasks/stats");

      if (response.data.success && response.data.data) {
        setStats(response.data.data.stats);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchTasks();
      fetchStats();
    }
  }, [user, fetchTasks, fetchStats]);

  const handleSubmitTask = async (data: Partial<Task>) => {
    try {
      if (editingTask) {
        await api.put(`/tasks/${editingTask._id}`, data);
        setToast({ message: "Task updated successfully", type: "success" });
      } else {
        await api.post("/tasks", data);
        setToast({ message: "Task created successfully", type: "success" });
      }

      setIsModalOpen(false);
      setEditingTask(undefined);
      fetchTasks();
      fetchStats();
    } catch (error: any) {
      setToast({
        message: error.response?.data?.message || "Operation failed",
        type: "error",
      });
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!confirm("Are you sure you want to delete this task?")) return;

    try {
      await api.delete(`/tasks/${taskId}`);
      setToast({ message: "Task deleted successfully", type: "success" });
      fetchTasks();
      fetchStats();
    } catch (error: any) {
      setToast({
        message: error.response?.data?.message || "Failed to delete task",
        type: "error",
      });
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleCreateTask = () => {
    setEditingTask(undefined);
    setIsModalOpen(true);
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="mb-4 sm:mb-6 md:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm sm:text-base text-gray-600">Welcome back, {user.name}!</p>
        </div>

        <TaskStats stats={stats} />

        <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">My Tasks</h2>
          <Button onClick={handleCreateTask} className="w-full sm:w-auto">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Create Task
          </Button>
        </div>

        <SearchFilter filters={filters} onFilterChange={setFilters} />

        <TaskList
          tasks={tasks}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
        />

        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingTask(undefined);
          }}
          title={editingTask ? "Edit Task" : "Create New Task"}
        >
          <TaskForm
            task={editingTask}
            onSubmit={handleSubmitTask}
            onCancel={() => {
              setIsModalOpen(false);
              setEditingTask(undefined);
            }}
          />
        </Modal>

        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </div>
  );
}

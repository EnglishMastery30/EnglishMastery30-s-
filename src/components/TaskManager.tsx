import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, Circle, GripVertical, Calendar, Flag, Filter, Plus, Trash2, Star } from 'lucide-react';

export type Priority = 'High' | 'Medium' | 'Low';
export type Status = 'Pending' | 'Completed';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: Status;
  priority: Priority;
  dueDate: string;
}

export function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([
    { 
      id: '1', 
      title: 'Study', 
      description: '1.1 The task is to add this to the knowledge base.\n1.2 The values need to be entered as decimal points.\n1.3 You will need to maintain consistency.\n1.4 When the values are added, they need to be entered as decimal points.\n1.5 Maintain a decimal point.\n1.6 Then add the values.\n1.7 Enter them as decimal points.\n1.8 Then add the values.\n1.9 Add what they like.\n1.10 Add them as decimal points.',
      status: 'Pending', 
      priority: 'High', 
      dueDate: new Date().toISOString().split('T')[0] 
    },
    { id: '2', title: 'Complete Grammar Day 1', status: 'Pending', priority: 'High', dueDate: new Date().toISOString().split('T')[0] },
    { id: '3', title: 'Review Vocabulary List', status: 'Pending', priority: 'Medium', dueDate: '' },
    { id: '4', title: 'Practice Pronunciation for 10 min', status: 'Pending', priority: 'Low', dueDate: '' },
  ]);

  const [filterStatus, setFilterStatus] = useState<Status | 'All'>('All');
  const [filterPriority, setFilterPriority] = useState<Priority | 'All'>('All');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<Priority>('Medium');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');

  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      status: 'Pending',
      priority: newTaskPriority,
      dueDate: newTaskDueDate,
    };
    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
    setNewTaskDueDate('');
  };

  const toggleTaskStatus = (id: string) => {
    setTasks(tasks.map(t => {
      if (t.id === id) {
        const newStatus = t.status === 'Pending' ? 'Completed' : 'Pending';
        return { ...t, status: newStatus };
      }
      return t;
    }));
  };

  const updateTaskPriority = (id: string) => {
    setTasks(tasks.map(t => {
      if (t.id === id) {
        const priorities: Priority[] = ['Low', 'Medium', 'High'];
        const currentIndex = priorities.indexOf(t.priority);
        const nextIndex = (currentIndex + 1) % priorities.length;
        return { ...t, priority: priorities[nextIndex] };
      }
      return t;
    }));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter(t => t.status !== 'Completed'));
  };

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedTaskId(id);
    e.dataTransfer.effectAllowed = 'move';
    // Firefox requires some data to be set
    e.dataTransfer.setData('text/plain', id);
  };

  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverId(id);
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    setDragOverId(null);
    if (!draggedTaskId || draggedTaskId === targetId) {
      setDraggedTaskId(null);
      return;
    }

    const newTasks = [...tasks];
    const draggedIndex = newTasks.findIndex(t => t.id === draggedTaskId);
    const targetIndex = newTasks.findIndex(t => t.id === targetId);

    if (draggedIndex !== -1 && targetIndex !== -1) {
      const [draggedItem] = newTasks.splice(draggedIndex, 1);
      newTasks.splice(targetIndex, 0, draggedItem);
      setTasks(newTasks);
    }
    setDraggedTaskId(null);
  };

  const filteredTasks = tasks.filter(task => {
    if (filterStatus !== 'All' && task.status !== filterStatus) return false;
    if (filterPriority !== 'All' && task.priority !== filterPriority) return false;
    return true;
  });

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case 'High': return 'text-rose-500 bg-rose-50 dark:bg-rose-500/10 border-rose-200';
      case 'Medium': return 'text-amber-500 bg-amber-50 dark:bg-amber-500/10 border-amber-200';
      case 'Low': return 'text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200';
    }
  };

  const getPriorityDot = (priority: Priority) => {
    switch (priority) {
      case 'High': return 'bg-rose-500';
      case 'Medium': return 'bg-amber-500';
      case 'Low': return 'bg-emerald-500';
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Study Tasks</h2>
        <p className="text-slate-600 dark:text-slate-400">Manage your learning goals and stay organized.</p>
      </div>

      {/* Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-fit">
            {(['All', 'Pending', 'Completed'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  filterStatus === status 
                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            {(['All', 'High', 'Medium', 'Low'] as const).map((priority) => (
              <button
                key={priority}
                onClick={() => setFilterPriority(priority)}
                className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                  filterPriority === priority
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-md'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 hover:border-indigo-300'
                }`}
              >
                {priority}
              </button>
            ))}
            
            {tasks.some(t => t.status === 'Completed') && (
              <button
                onClick={clearCompleted}
                className="ml-2 px-3 py-1 rounded-full text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10 border border-transparent hover:border-rose-200 transition-all"
              >
                Clear Completed
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Add Task */}
      <form onSubmit={addTask} className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 mb-8 flex flex-col sm:flex-row gap-3">
        <input 
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="New task title..."
          className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5"
          required
        />
        <select 
          value={newTaskPriority}
          onChange={(e) => setNewTaskPriority(e.target.value as Priority)}
          className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5"
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <input 
          type="date"
          value={newTaskDueDate}
          onChange={(e) => setNewTaskDueDate(e.target.value)}
          className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5"
        />
        <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white p-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors">
          <Plus className="w-5 h-5" />
          <span className="sm:hidden">Add</span>
        </button>
      </form>

      {/* Completion Stats */}
      {tasks.length > 0 && (
        <div className="mb-6 bg-indigo-50 dark:bg-indigo-500/5 border border-indigo-100 dark:border-indigo-500/20 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center border-2 border-indigo-500 relative">
              <svg className="w-10 h-10 transform -rotate-90">
                <circle
                  cx="20" cy="20" r="16"
                  stroke="currentColor" strokeWidth="3" fill="transparent"
                  className="text-slate-200 dark:text-slate-800"
                />
                <motion.circle
                  cx="20" cy="20" r="16"
                  stroke="currentColor" strokeWidth="3" fill="transparent"
                  strokeDasharray={100}
                  strokeDashoffset={100 - (tasks.filter(t => t.status === 'Completed').length / tasks.length) * 100}
                  className="text-indigo-500"
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </svg>
              <span className="absolute text-[10px] font-bold text-indigo-600 dark:text-indigo-400">
                {Math.round((tasks.filter(t => t.status === 'Completed').length / tasks.length) * 100)}%
              </span>
            </div>
            <div>
              <p className="font-bold text-slate-900 dark:text-white">Overall Progress</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {tasks.filter(t => t.status === 'Completed').length} of {tasks.length} tasks completed
              </p>
            </div>
          </div>
          {tasks.every(t => t.status === 'Completed') && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1 rounded-full shadow-sm"
            >
              <Star className="w-4 h-4 fill-emerald-500" />
              All Clear!
            </motion.div>
          )}
        </div>
      )}

      {/* Task List */}
      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12 text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
            No tasks found matching your filters.
          </div>
        ) : (
          <AnimatePresence>
            {filteredTasks.map((task) => (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                draggable
                onDragStart={(e) => handleDragStart(e as unknown as React.DragEvent, task.id)}
                onDragOver={(e) => handleDragOver(e as unknown as React.DragEvent, task.id)}
                onDrop={(e) => handleDrop(e as unknown as React.DragEvent, task.id)}
                onDragLeave={() => setDragOverId(null)}
                className={`group flex items-center p-4 bg-white dark:bg-slate-900 rounded-xl shadow-sm border ${
                  draggedTaskId === task.id ? 'opacity-50' : 'opacity-100'
                } ${
                  dragOverId === task.id ? 'border-indigo-500 scale-[1.02] bg-indigo-50/20' : ''
                } ${
                  task.status === 'Completed' 
                    ? 'border-indigo-100 dark:border-indigo-500/20 bg-indigo-50/50 dark:bg-indigo-500/5' 
                    : 'border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700'
                } transition-all cursor-move`}
              >
                <div className="mr-3 cursor-grab text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 pt-1 flex-shrink-0">
                  <GripVertical className="w-5 h-5" />
                </div>
                
                <button 
                  onClick={() => toggleTaskStatus(task.id)}
                  className="mr-4 flex-shrink-0 relative focus:outline-none"
                >
                  <motion.div
                    initial={false}
                    animate={{
                      scale: task.status === 'Completed' ? [1, 1.2, 1] : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {task.status === 'Completed' ? (
                      <CheckCircle className="w-6 h-6 text-indigo-600 dark:text-indigo-400 fill-indigo-100 dark:fill-indigo-900" />
                    ) : (
                      <Circle className="w-6 h-6 text-slate-300 dark:text-slate-600 hover:text-indigo-500" />
                    )}
                  </motion.div>
                </button>
                
                <div className="flex-1 min-w-0 pr-4">
                  <motion.span 
                    animate={{ 
                      color: task.status === 'Completed' ? '#94a3b8' : 'inherit',
                      x: task.status === 'Completed' ? 4 : 0
                    }}
                    className={`block font-medium text-lg transition-colors truncate relative group-item-text ${
                      task.status === 'Completed' 
                        ? 'dark:text-slate-500' 
                        : 'text-slate-900 dark:text-white'
                    }`}
                  >
                    {task.title}
                    {task.status === 'Completed' && (
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        className="absolute left-0 top-1/2 h-0.5 bg-slate-300 dark:bg-slate-600 -translate-y-1/2"
                      />
                    )}
                  </motion.span>
                  
                  {task.description && (
                    <div className="mt-2 text-sm text-slate-600 dark:text-slate-400 whitespace-pre-line">
                      {task.description}
                    </div>
                  )}
                  
                  <div className="flex flex-wrap items-center gap-3 mt-1.5 font-sans">
                    <button 
                      onClick={(e) => { e.stopPropagation(); updateTaskPriority(task.id); }}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-bold border transition-all hover:scale-105 active:scale-95 ${getPriorityColor(task.priority)} shadow-sm`}
                      title="Click to cycle priority"
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${getPriorityDot(task.priority)}`}></span>
                      {task.priority}
                    </button>
                    
                    {task.dueDate && (
                      <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-md ${
                        new Date(task.dueDate) < new Date(new Date().setHours(0,0,0,0)) && task.status !== 'Completed'
                          ? 'text-rose-600 bg-rose-50 dark:bg-rose-500/10 border border-rose-200' 
                          : 'text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800'
                      }`}>
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                        {new Date(task.dueDate) < new Date(new Date().setHours(0,0,0,0)) && task.status !== 'Completed' && (
                          <span className="ml-1 animate-pulse italic">(Overdue)</span>
                        )}
                      </span>
                    )}
                  </div>
                </div>
                
                <button 
                  onClick={() => deleteTask(task.id)}
                  className="opacity-0 group-hover:opacity-100 focus:opacity-100 p-2 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 bg-slate-50 hover:bg-rose-50 dark:bg-slate-800 tracking-colors rounded-lg transition-all flex-shrink-0"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

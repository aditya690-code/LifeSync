    import "./index.css";
    import { Routes, Route, Navigate } from "react-router-dom";
    import { useState } from "react";
    import Home from "./pages/Home";
    import Nav from "./components/Navbar/Nav";
    import Diary from "./pages/Diary";
    import ToDo from "./pages/ToDo";
    import Notes from "./pages/Notes";
    import Expenses from "./pages/Expenses";
    import Entry from "./pages/Entry";
    import Ai from "./pages/Ai.jsx";
    import { expenses, tasks, notes, diaries } from "./services/data";
    import Verification from "./pages/Verification.jsx";
    import Calendar from "./pages/Calendar.jsx";
    import Sidebar from "./pages/Sidebar.jsx";
import Security from "./pages/Security.jsx";

    function App() {
    const [access, setAccess] = useState(true);
    const [sidebar,setSidebar] = useState(false);

    function changeAccess(st) {
        setAccess(st);
    }

    function handleSidebar(){
        setSidebar(!sidebar);
    }

    return (
        <div className="no-scrollbar">
        <Nav handleSidebar={handleSidebar} />
        <Routes>
            <Route path="/" element={<Entry />} />

            {!access && (
            <Route path="*" element={<Navigate to="/verify" replace />} />
            )}

            <Route
            path="/verify"
            element={
                access ? (
                <Navigate to="/home" replace />
                ) : (
                <Verification changeAccess={changeAccess} />
                )
            }
            />

            {access && (
            <>
                <Route
                path="/home"
                element={
                    <Home
                    expenses={expenses}
                    diaries={diaries}
                    tasks={tasks}
                    notes={notes}
                    />
                }
                />
                <Route path="/diary" element={<Diary diaries={diaries} />} />
                <Route path="/routines" element={<ToDo tasks={tasks} />} />
                <Route path="/notes" element={<Notes notes={notes} />} />
                <Route path="/expenses" element={<Expenses expenses={expenses} />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/security" element={<Security />} />
            </>
            )}
        </Routes>
        {access && (
            <>
                {access && (
                    <Ai />
                )}
                {sidebar && <Sidebar handleSidebar={handleSidebar} />}
            </>
        )}
        </div>
    );
    }

    export default App;

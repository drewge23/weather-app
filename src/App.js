import {QueryClient, QueryClientProvider} from 'react-query'
import './App.css';
import {ReactQueryDevtools} from "react-query/devtools";
import Weather from "./Weather";
import "bootstrap/dist/css/bootstrap.min.css";

const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="App">
                <Weather />
            </div>
            <ReactQueryDevtools/>
        </QueryClientProvider>
    );
}

export default App;

import { useContext } from "react";
import { LocationContext } from "./contexts/location-context";


export function useLocation() {
    const context = useContext(LocationContext);

    if(context === undefined) {
        throw new Error("useLocation must be used within an LocationProvider");
    }

    return context;
}


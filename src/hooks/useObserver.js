import React, {useEffect, useRef} from 'react';

export const useObserver = (ref, canLoad, isLoading, callback) => {
    const observer = useRef();

    useEffect(() => {
        if(isLoading) return;
        if(observer.current) observer.current.disconnect();
        var cb = function(entries, observer) {
            if(entries[0].isIntersection && canLoad) {
                callback()
            }
        };
        observer.current = new IntersectionObserver(callback);
        observer.current.observe(ref.current)
    }, [isLoading])
}
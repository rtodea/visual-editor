// Read more about this here: https://stackoverflow.com/a/67504622/351442
import {
  DependencyList,
  EffectCallback,
  useCallback,
  useEffect,
  useRef,
} from "react";
import _ from "lodash";

export function useLazyEffect(
  effect: EffectCallback,
  deps: DependencyList = [],
  wait = 3000
) {
  const cleanUp = useRef<void | (() => void)>();
  const effectRef = useRef<EffectCallback>();
  const updatedEffect = useCallback(effect, deps);
  effectRef.current = updatedEffect;
  const lazyEffect = useCallback(
    _.debounce(() => {
      cleanUp.current = effectRef.current?.();
    }, wait),
    []
  );
  useEffect(lazyEffect, deps);
  useEffect(() => {
    return () => {
      cleanUp.current instanceof Function ? cleanUp.current() : undefined;
    };
  }, []);
}

import './style.scss';
import throttle from 'lodash/throttle';
//@ ts-ignore // import { throttle } from "https://cdn.skypack.dev/lodash@4.17.20";

class Carousel {
    static getDest(element: Element): Element | undefined {
        if (!element || element === document.documentElement) {
            return;
        }
        if (element.classList.contains("destination")) {
            return element;
        }
        return Carousel.getDest(element.parentElement);
    }

    private wrapperElement: Element;
    private dests: Element[];
    private active: number;

    constructor(element: Element) {
        this.wrapperElement = element;
        this.dests = [...element.querySelectorAll(".destination")];
        this.active = null;
        this.update();
        this.wrapperElement.classList.remove("loading");

        this.wrapperElement.addEventListener("mouseover", (event) => {
            const dest = Carousel.getDest(event.target as Element);
            if (!dest || dest === this.dests[this.active]) {
                return;
            }
            this.activate(dest);
        });

        this.wrapperElement.addEventListener("mouseleave", throttle((event) => {
            if (event.target === this.wrapperElement) {
                this.deactivate();
            }
        }, 500));
    }

    getIndex(dest: Element): number {
        if (!this.dests.includes(dest)) {
            return;
        }
        let i = 0;
        for (let currentDest of this.dests) {
            if (dest === currentDest) {
                return i;
            }
            i++;
        }
    }

    activate(dest: Element): void {
        this.active = this.getIndex(dest) ?? null;
        this.update();
    }

    deactivate(): void {
        this.active = null;
        this.update();
    }

    update(): void {
        this.dests.forEach((dest: Element, index: number) => {
            dest.className = "destination";

            if (index === this.active) {
                dest.classList.add("unfolded", isOdd(index) ? "back" : "front");
            } else {
                dest.classList.add("folded");

                if (this.active === null || index < this.active) {
                    dest.classList.add(isOdd(index) ? "right" : "left");
                } else if (index > this.active) {
                    dest.classList.add(isOdd(index) ? "left" : "right");
                }
            }
        });
    }
}

function isOdd(value: number) {
    return value % 2 === 0;
}

const carousel = new Carousel(document.querySelector(".wrapper"));

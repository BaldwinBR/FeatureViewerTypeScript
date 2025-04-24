import ComputingFunctions from './helper';

export class SubfeaturesTransition extends ComputingFunctions {

    public area(gElement, newY) {
        gElement
            .attr("transform", "translate(0," + newY +")")
            .transition().duration(500);
    }
    public position(gElement, parentElementRow) {
        gElement
            .attr("position", "element(#"+ parentElementRow +")");
    }
    public Xaxis(axis, newY) {
        axis
            .attr("transform", "translate(0," + newY +")")
            .transition().duration(500);
    }
    public containerH(container, newH) {
        container
            .attr("height", newH)
    }

    constructor(commons: {}) {
        super(commons);
    }
}

export class Transition extends ComputingFunctions {

    public basalLine(object) {

        let container = this.commons.svgContainer.select(`#c${object.id}_container`);
        container.selectAll(".line")
            .attr("d", this.commons.line);

    }

    public rectangle(object) {

        let container = this.commons.svgContainer.select(`#c${object.id}_container`);
        // line does not require transition

        let transit1, transit2;
        // group selection
        transit1 = container.selectAll("." + "rectfv" + "Group")
        transit2 = container.selectAll("." + "rectfv")
        // transition
        if (this.commons.animation) {
            transit1
                .transition()
                .duration(500);
            transit2
                .transition()
                .duration(500);
        }
        // transition
        transit1.attr("transform",  (d) => {
            return "translate(" + this.rectX(d) + ",0)"
        });
        transit2
            .attr("width", this.rectWidth2);

        // transition to text
        container.selectAll("." + object.className + "Text")
            .attr("transform",  (d) => {
                if (d.label && this.commons.scaling(d['x'])<0) {
                    return "translate(" + -this.rectX(d) + ",0)"
                }
            })
            .style("visibility",  (d) => {
                if (d.label && this.commons.scaling(d['x'])>0) {
                    return (this.commons.scaling(d.y) - this.commons.scaling(d['x'])) > d.label.length * 8 && object.height > 11 ? "visible" : "hidden";
                } else return "hidden";
            });
    }

    public multiRec(object) {

        let container = this.commons.svgContainer.select(`#c${object.id}_container`);
        container.selectAll("." + "rectfv")
            .attr("x",  (d) => {
                return this.commons.scaling(d['x'])
            })
            .attr("width",  (d) => {
                return this.commons.scaling(d.y) - this.commons.scaling(d['x'])
            });

    }

    public unique(object) {

        let container = this.commons.svgContainer.select(`#c${object.id}_container`);
        // line does not require transition

        let transit;
        if (this.commons.animation) {
            transit = container.selectAll(".element")
                .transition()
                .duration(500);
        }
        else {
            transit = container.selectAll(".element");
        }
        transit
            .attr("x", (d) => {
                return this.commons.scaling(d['x'] - 0.4)
            })
            .attr("width", (d) => {
                if (this.commons.scaling(d['x'] + 0.4) - this.commons.scaling(d['x'] - 0.4) < 2) return 2;
                else return this.commons.scaling(d['x'] + 0.4) - this.commons.scaling(d['x'] - 0.4);
            });

    }

    public lollipop(object) {

        let container = this.commons.svgContainer.select(`#c${object.id}_container`);
        // line does not require transition

        let transit1, transit2;
        if (this.commons.animation) {
            transit1 = container.selectAll(".element")
                .transition()
                .duration(500);
            transit2 = container.selectAll(".lineElement")
                .transition()
                .duration(500);
        }
        else {
            transit1 = container.selectAll(".element");
            transit2 = container.selectAll(".lineElement");
        }
        transit1
            .attr("cx", (d) => {
                return this.commons.scaling(d.x)
            });
        transit2
            .attr("x1", (d) => {
                return this.commons.scaling(d.x)
            })
            .attr("x2", (d) => {
                return this.commons.scaling(d.x)
            })
        // .attr("y2", (d) => {
        //     let w = this.commons.scaling(d.x + 0.4) - this.commons.scaling(d.x - 0.4);
        //     if (this.commons.scaling(d.x + 0.4) - this.commons.scaling(d.x - 0.4) < 2) w = 2;
        //     return w + 4;
        // });

    }

    // PTM TRIANGLE
    public ptmTriangle(object) {
        const container = this.commons.svgContainer.select(`#c${object.id}_container`);
        
        // Exit early if the container is not found
        if (container.empty()) return;
    
        // Determine if a transition animation should be applied
        let transit = this.commons.animation
            ? container.selectAll(".ptm-triangle").transition().duration(500)
            : container.selectAll(".ptm-triangle");
    
        // Triangle size parameters
        const triangleSize = 16;
        const halfWidth = 4;
        const verticalSpacing = triangleSize;
    
        // Update the triangle positions when zoomed
        transit
            .attr("points", d => {
                const cx = this.commons.scaling(d.x);
                
                // Maintain the same stacked vertical offset
                const cy = -d._stackY * verticalSpacing;
    
                const tip = [cx, cy];
                const left = [cx - halfWidth, cy - triangleSize];
                const right = [cx + halfWidth, cy - triangleSize];
                return `${tip.join(',')} ${left.join(',')} ${right.join(',')}`;
            });
    } 

    public circle(object) {

        let container = this.commons.svgContainer.select(`#c${object.id}_container`);
        // line does not require transition

        let transit;
        if (this.commons.animation) {
            transit = container.selectAll(".element")
                .transition()
                .duration(500);
        }
        else {
            transit = container.selectAll(".element");
        }
        transit
            .attr("cx", (d) => {
                return this.commons.scaling(d['x'])
            })
            .attr("width", (d) => {
                if (this.commons.scaling(d['x'] + 0.4) - this.commons.scaling(d['x'] - 0.4) < 2) return 2;
                else return this.commons.scaling(d['x'] + 0.4) - this.commons.scaling(d['x'] - 0.4);
            });

    }

    public path(object) {

        let container = this.commons.svgContainer.select(`#c${object.id}_container`);
        container.selectAll(".line")
            .attr("d", this.commons.lineBond.x((d) => {
                    return this.commons.scaling(d['x']);
                })
                    .y( (d) => {
                        return -d['y'] * 10 + object.height;
                    })
            );
        let transit;
        if (this.commons.animation) {
            transit = container.selectAll("." + "pathfv")
                .transition()
                .duration(0);
        }
        else {
            transit = container.selectAll("." + "pathfv");
        }
        transit
            .attr("d", this.commons.lineBond.y((d) => {
                return -1 * d['y'] * 10 + object.height;
            }));
    }
    
    public lineTransition(object) {
        let container = this.commons.svgContainer.select(`#c${object.id}_container`);
        
        let data;

        // flatten data into one array and get max/min scores from that
        if (Array.isArray(object.data[0])){
            data = object.data.flat(2)
        } else {
            data =  object.data
        }
        
        const yScores = data.map(o => o.y);
        const maxScore = Math.max(...yScores);
        const minScore = Math.min(...yScores);
        // keep height
        this.commons.lineYScale.domain([0, 1]).range([0, this.commons.step/11]);
        container.selectAll(".line " + object.className)
            .attr("d", (d) => {
                //return this.commons.lineYScale(-d.y) * 10 + object.shift
                // Changes line scale differential
                // aka how much space it takes up
                return this.commons.lineYScale(-d.y) * 22 + object.shift
            });

        // transit line
        let transit;
        if (this.commons.animation) {
            transit = container.selectAll("." + object.className)
                .transition()
                .duration(0);
        }
        else {
            transit = container.selectAll("." + object.className);
        }

        transit
            .attr("d", this.commons.lineGen.y((d) => {
                    //return this.commons.lineYScale(-d.y) * 10 + object.shift
                    return this.commons.lineYScale(-d.y) * 22 + object.shift;
                })
            );
    }



    public text(object, start) {

        let container = this.commons.svgContainer.select(`#c${object.id}_container`);
        let transit;
        if (this.commons.animation) {
            transit = container.selectAll("." + object.className)
                .transition()
                .duration(500);
        }
        else {
            transit = container.selectAll("." + object.className);
        }
        transit
            .attr("x", (d, i) => {
                return this.commons.scaling(i + start)
            });
    }

    constructor(commons: {}) {
        super(commons);
    }
};
function plot(minx,maxx,fun,isequal,option){
	number = 100
	var lines = []
	var points = []
	var detax = (maxx - minx) / number
	var x = minx
	var y = fun(minx)
	var miny = y
	var maxy = y
	points.push(new POINT(x,y))
	for(var i=0;i<number;i++){
		x = x + detax
		y = fun(x)
		if(y < miny){
			miny = y
		}else if(y > maxy){
			maxy = y
		}
		points.push(new POINT(x,y))
		lines.push(i)
	}
	console.log(lines)
	var map = d3.select('svg#map')
	var width = parseInt(map.style('width'))
	var height = parseInt(map.style('height'))

	if(option && option.lineWidth){
		var lineWidth = option.lineWidth
	}else{
		var lineWidth = '3'
	}

	if(option && option.color){
		var color = option.color
	}else{
		var color = 'red'
	}

	map.selectAll('line')
	.data(lines)//添加数据
	.enter()//求数据和图形的差集
	.append('line')//添加图形

	map.selectAll('line')
	.data(lines)
	.attr('x1',(d) =>{ return mapperx(points[d].x)})//更新图形的属性
	.attr('y1',(d) =>{ return mappery(points[d].y)})
	.attr('x2',(d) =>{ return mapperx(points[d+1].x)})
	.attr('y2',(d) =>{ return mappery(points[d+1].y)})
	.attr('stroke',color)
	.attr('stroke-width',lineWidth)
	.exit()//退出，求数据和图形的差集中，图形的部分
	.remove()

	function POINT(x,y){
		this.x = x;
		this.y = y;
	}

	function mapperx(x){
		return (width - 40) / (maxx - minx) * (x - minx) + 20
	}

	function mappery(y){
		if(isequal){
			return height - 20 - (width - 40) / (maxx - minx) * (y - miny)
		}else{
			return height - 20 - (height - 40) / (maxy - miny) * (y - miny)
		}
	}


}
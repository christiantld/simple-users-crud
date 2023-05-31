import { Readable, Writable, Transform } from "node:stream";

class OneToHundred extends Readable {
	index = 1;
	_read() {
		const i = this.index++;

		setTimeout(() => {
			if (i > 100) {
				this.push(null);
			} else {
				const buf = Buffer.from(`${i}\n`);
				this.push(buf);
			}
		}, 1000);
	}
}

class MultiplyByTen extends Writable {
	_write(chunk, _, callback) {
		console.log(Number(chunk.toString()) * 10);
		callback();
	}
}

class InvertNumber extends Transform {
	_transform(chunk, _, callback) {
		const transformed = Number(chunk.toString()) * -1;
		const buf = Buffer.from(transformed.toString());
		callback(null, buf);
	}
}

new OneToHundred().pipe(new InvertNumber()).pipe(new MultiplyByTen());

module.exports = class JoxtacyPrependWebpackPlugin {
    constructor(options) {
        if (typeof options === "string") {
            this.options = {
                comment: options
            }
        } else {
            this.options = options || {};
        }
    }

    apply(compiler) {
        compiler.hooks.emit.tapAsync("JoxtacyPrependWebpackPlugin", (compilation, callback) => {
            compilation.chunks.forEach(chunk => {
                chunk.files.forEach(filename => {
                    const source = compilation.assets[filename].source();
                    const sourceWithComment = this.options.comment ? `/* ${this.options.comment} */${source}` : source;
                    compilation.assets[filename] = {
                        source: function() {
                            return sourceWithComment;
                        },
                        size: function() {
                            return Buffer.from(sourceWithComment).length;
                        }
                    };
                });
            });
            callback();
        });
    }
};

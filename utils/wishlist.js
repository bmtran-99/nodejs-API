module.exports = function Wishlist(initItems) {
    this.items = initItems.items || {};
    this.total = initItems.total || 0;

    this.add = (item, id) => {
        var storedItem = this.items[id];
        if (!storedItem) {
            storedItem = this.items[id] = {item: item};
            this.total++;
        }
    };

    this.remove = (id) => {
        delete this.items[id];
        this.total--;
    };

    this.generateArray = () => {
        var arr = [];
        for (var id in this.items) arr.push(this.items[id]);
        return arr;
    };
}
module.exports = {
create(context) {
        return {
            ImportDefaultSpecifier(node) {
                if (node.local.name === 'React') {
                    context.report(
                        node,
                        'Do not import React, use import deconstruction instead',
                    );
                }
            },
        };
    },
};

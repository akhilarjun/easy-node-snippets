const os = require('os');
const ifaces = os.networkInterfaces();

/**
 *  Get IPv4 Address of the System
 */
const getIPV4 = () => {
    let ipv4Address;
    Object.keys(ifaces).forEach(function (ifname) {
        ifaces[ifname].forEach(function (iface) {
        if ('IPv4' !== iface.family || iface.internal !== false) {
            return;
        }
        ipv4Address = iface.address;
        });
    });
    return ipv4Address;
}

module.exports = {
    getIpv4 : getIPV4
}